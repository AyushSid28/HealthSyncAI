"""Appointment booking endpoints."""

import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

_bookings_store: dict[str, dict] = {}


class BookingRequest(BaseModel):
    service_type: str
    date: str
    time: str
    name: str
    email: str
    phone: str = ""
    notes: str = ""


class BookingResponse(BaseModel):
    booking_id: str
    status: str
    message: str


@router.post("", response_model=BookingResponse)
async def create_booking(request: BookingRequest):
    booking_id = str(uuid.uuid4())
    _bookings_store[booking_id] = {
        "booking_id": booking_id,
        "service_type": request.service_type,
        "date": request.date,
        "time": request.time,
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "notes": request.notes,
        "status": "confirmed",
        "created_at": datetime.now().isoformat(),
    }
    return BookingResponse(
        booking_id=booking_id,
        status="confirmed",
        message=f"Appointment booked for {request.date} at {request.time}.",
    )


@router.get("/{booking_id}")
async def get_booking(booking_id: str):
    booking = _bookings_store.get(booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.get("")
async def list_bookings():
    return {"bookings": list(_bookings_store.values())}
