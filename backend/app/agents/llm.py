import asyncio
import json
import logging
import re

from openai import AsyncOpenAI, RateLimitError, APIStatusError

from app.config import get_settings

GROQ_BASE_URL = "https://api.groq.com/openai/v1"

logger = logging.getLogger(__name__)

MAX_RETRIES = 5
BASE_DELAY = 10.0


async def call_llm(system_prompt: str, user_message: str) -> dict:
    """Call Groq API with automatic retry on rate limits."""
    settings = get_settings()
    client = AsyncOpenAI(
        api_key=settings.groq_api_key,
        base_url=GROQ_BASE_URL,
    )

    for attempt in range(MAX_RETRIES):
        try:
            response = await client.chat.completions.create(
                model=settings.groq_model,
                max_tokens=4096,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message},
                ],
                temperature=0.3,
                response_format={"type": "json_object"},
            )
            text = response.choices[0].message.content or "{}"
            json_match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
            if json_match:
                return json.loads(json_match.group(1))
            return json.loads(text)

        except (RateLimitError, APIStatusError) as e:
            is_rate_limit = isinstance(e, RateLimitError) or (
                isinstance(e, APIStatusError) and e.status_code in (413, 429)
            )
            if not is_rate_limit:
                raise
            delay = BASE_DELAY * (2 ** attempt)
            logger.warning(
                "Rate limited (attempt %d/%d), waiting %.0fs",
                attempt + 1, MAX_RETRIES, delay,
            )
            if attempt == MAX_RETRIES - 1:
                raise
            await asyncio.sleep(delay)

        except json.JSONDecodeError as e:
            logger.error("JSON parse failed on attempt %d: %s", attempt + 1, e)
            if attempt == MAX_RETRIES - 1:
                raise
            await asyncio.sleep(3.0)

    return {}
