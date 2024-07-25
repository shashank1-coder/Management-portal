from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy import Integer, String, Column, ForeignKey, select, update, delete
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, selectinload
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import asyncio
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException


# SQLAlchemy configuration
DATABASE_URL = "sqlite+aiosqlite:///db.serviceapp"
engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
Base = declarative_base()

# Models definition
class Vendors(Base):
    __tablename__ = 'vendor_details'
    vendor_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    organization = Column(Integer, ForeignKey("organization.organization_id"))
    role = Column(Integer, ForeignKey("role.role_id"))  
    service = Column(Integer, ForeignKey("service.service_id"))
    phone = Column(Integer, unique=True)
    email = Column(String, unique=True)

    organization_obj = relationship("Organization", back_populates="vendors")
    role_obj = relationship("Role", back_populates="vendors")
    service_obj = relationship("Service", back_populates="vendors")


class Organization(Base):
    __tablename__ = "organization"
     
    organization_id = Column(Integer, primary_key=True, index=True)
    organization_name = Column(String, unique=True)

    vendors = relationship("Vendors", back_populates="organization_obj")

class Role(Base):
    __tablename__ = 'role'
    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, index=True)

    vendors = relationship("Vendors", back_populates="role_obj")

class Service(Base):
    __tablename__ = "service"

    service_id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String, unique=True)

    vendors = relationship("Vendors", back_populates="service_obj")

class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

    # Pydantic models

class VendorCreate(BaseModel):
    name: str
    organization_name: str
    role_name: str
    service_name: str
    phone: int
    email: EmailStr

class VendorRead(BaseModel):
    vendor_id: int
    name: str
    organization_name: str
    role_name: str
    service_name: str
    phone: int
    email: EmailStr

    class Config:
        from_attributes = True


        # FastAPI app
app = FastAPI()

# CORS (Cross-Origin Resource Sharing) middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, replace with specific origins as needed
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Dependency to get DB session
async def get_db():
    async with SessionLocal() as session:
        yield session

# Create database tables
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def on_startup():
    await create_tables()

# Read all vendors
@app.get("/", response_model=List[VendorRead])
async def read_vendors(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Vendors)
        .options(
            selectinload(Vendors.organization_obj),
            selectinload(Vendors.role_obj),
            selectinload(Vendors.service_obj),
        )
    )
    vendors = result.scalars().all()

    # Transform the results to include names instead of IDs
    vendor_list = [
        VendorRead(
            vendor_id=vendor.vendor_id,
            name=vendor.name,
            organization_name=vendor.organization_obj.organization_name,
            role_name=vendor.role_obj.role_name,
            service_name=vendor.service_obj.service_name,
            phone=vendor.phone,
            email=vendor.email,
        )
        for vendor in vendors
    ]

    return vendor_list


# Read specific vendor
@app.get("/vendors/{vendor_id}", response_model=VendorRead)
async def read_vendor(vendor_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Vendors)
        .where(Vendors.vendor_id == vendor_id)
        .options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj))
    )
    vendor = result.scalars().first()
    if vendor is None:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return VendorRead(
        vendor_id=vendor.vendor_id,
        name=vendor.name,
        organization_name=vendor.organization_obj.organization_name,
        role_name=vendor.role_obj.role_name,
        service_name=vendor.service_obj.service_name,
        phone=vendor.phone,
        email=vendor.email,
    )

# Create vendor endpoint
@app.post("/vendors/")
async def create_vendor(vendor: VendorCreate, db: AsyncSession = Depends(get_db)):
    try:
        # Check if organization exists, create if it doesn't
        org_result = await db.execute(select(Organization).where(Organization.organization_name == vendor.organization_name))
        organization = org_result.scalars().first()
        if not organization:
            organization = Organization(organization_name=vendor.organization_name)
            db.add(organization)
            await db.commit()
            await db.refresh(organization)
        
        # Check if role exists, create if it doesn't
        role_result = await db.execute(select(Role).where(Role.role_name == vendor.role_name))
        role = role_result.scalars().first()
        if not role:
            role = Role(role_name=vendor.role_name)
            db.add(role)
            await db.commit()
            await db.refresh(role)
        
        # Check if service exists, create if it doesn't
        service_result = await db.execute(select(Service).where(Service.service_name == vendor.service_name))
        service = service_result.scalars().first()
        if not service:
            service = Service(service_name=vendor.service_name)
            db.add(service)
            await db.commit()
            await db.refresh(service)

        new_vendor = Vendors(
            name=vendor.name,
            organization=organization.organization_id,
            role=role.role_id,
            service=service.service_id,
            phone=vendor.phone,
            email=vendor.email
        )
        db.add(new_vendor)
        await db.commit()
        await db.refresh(new_vendor)
        return new_vendor
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists.")