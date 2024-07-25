# from fastapi import FastAPI, Depends, HTTPException, status
# from sqlalchemy import Integer, String, Column, ForeignKey, select, update, delete
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker, declarative_base, relationship, selectinload
# from pydantic import BaseModel, EmailStr
# from typing import List, Optional
# import asyncio
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from fastapi.middleware.cors import CORSMiddleware

# # SQLAlchemy configuration
# DATABASE_URL = "sqlite+aiosqlite:///db.serviceapp"
# engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
# Base = declarative_base()

# # Models definition
# class Vendors(Base):
#     __tablename__ = 'vendor_details'
#     vendor_id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     organization = Column(Integer, ForeignKey("organization.organization_id"))
#     role = Column(Integer, ForeignKey("role.role_id"))  
#     service = Column(Integer, ForeignKey("service.service_id"))
#     phone = Column(Integer, unique=True)
#     email = Column(String, unique=True)

#     organization_obj = relationship("Organization", back_populates="vendors")
#     role_obj = relationship("Role", back_populates="vendors")
#     service_obj = relationship("Service", back_populates="vendors")


# class Organization(Base):
#     __tablename__ = "organization"
     
#     organization_id = Column(Integer, primary_key=True, index=True)
#     organization_name = Column(String, unique=True)

#     vendors = relationship("Vendors", back_populates="organization_obj")

# class Role(Base):
#     __tablename__ = 'role'
#     role_id = Column(Integer, primary_key=True, index=True)
#     role_name = Column(String, index=True)

#     vendors = relationship("Vendors", back_populates="role_obj")

# class Service(Base):
#     __tablename__ = "service"

#     service_id = Column(Integer, primary_key=True, index=True)
#     service_name = Column(String, unique=True)

#     vendors = relationship("Vendors", back_populates="service_obj")

# class Users(Base):
#     __tablename__ = "users"

#     user_id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     email = Column(String, unique=True)
#     password = Column(String)

# # Pydantic models
# class VendorCreate(BaseModel):
#     name: str
#     organization: int
#     role: int
#     service: int
#     phone: int
#     email: EmailStr

# # class VendorRead(BaseModel):
# #     vendor_id: int
# #     name: str
# #     organization: int
# #     role: int
# #     service: int
# #     phone: int
# #     email: EmailStr

# #     class Config:
# #         orm_mode = True

# class VendorRead(BaseModel):
#     vendor_id: int
#     name: str
#     organization_name: str
#     role_name: str
#     service_name: str
#     phone: int
#     email: EmailStr

#     class Config:
#         orm_mode = True

# class VendorUpdate(BaseModel):
#     name: Optional[str] = None
#     organization: Optional[int] = None
#     role: Optional[int] = None
#     service: Optional[int] = None
#     phone: Optional[int] = None
#     email: Optional[EmailStr] = None

# class RoleCreate(BaseModel):
#     role_name: str

# class RoleRead(BaseModel):
#     role_id: int
#     role_name: str

#     class Config:
#         orm_mode = True

# class RoleUpdate(BaseModel):
#     role_name: Optional[str] = None

# class ServiceCreate(BaseModel):
#     service_name: str

# class ServiceRead(BaseModel):
#     service_id: int
#     service_name: str

#     class Config:
#         orm_mode = True

# class ServiceUpdate(BaseModel):
#     service_name: Optional[str] = None

# class OrganizationCreate(BaseModel):
#     organization_name: str

# class OrganizationRead(BaseModel):
#     organization_id: int
#     organization_name: str

#     class Config:
#         orm_mode = True

# class OrganizationUpdate(BaseModel):
#     organization_name: Optional[str] = None

# class EmailSchema(BaseModel):
#     subject: str
#     body: str
#     vendor_ids: List[int]    

# # FastAPI app
# app = FastAPI()

# # CORS (Cross-Origin Resource Sharing) middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins, replace with specific origins as needed
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# # Dependency to get DB session
# async def get_db():
#     async with SessionLocal() as session:
#         yield session

# # Create database tables
# async def create_tables():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

# @app.on_event("startup")
# async def on_startup():
#     await create_tables()

# # # Read all vendors
# # @app.get("/", response_model=List[VendorRead])
# # async def read_vendors(db: AsyncSession = Depends(get_db)):
# #     result = await db.execute(select(Vendors).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
# #     vendors = result.scalars().all()
# #     return vendors

# # Read all vendors
# @app.get("/", response_model=List[VendorRead])
# async def read_vendors(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(
#         select(Vendors)
#         .options(
#             selectinload(Vendors.organization_obj),
#             selectinload(Vendors.role_obj),
#             selectinload(Vendors.service_obj),
#         )
#     )
#     vendors = result.scalars().all()

#     # Transform the results to include names instead of IDs
#     vendor_list = [
#         VendorRead(
#             vendor_id=vendor.vendor_id,
#             name=vendor.name,
#             organization_name=vendor.organization_obj.organization_name,
#             role_name=vendor.role_obj.role_name,
#             service_name=vendor.service_obj.service_name,
#             phone=vendor.phone,
#             email=vendor.email,
#         )
#         for vendor in vendors
#     ]

#     return vendor_list


# # Create vendor
# @app.post("/vendors/", response_model=VendorRead, status_code=status.HTTP_201_CREATED)
# async def create_vendor(vendor: VendorCreate, db: AsyncSession = Depends(get_db)):
#     db_vendor = Vendors(**vendor.dict())
#     db.add(db_vendor)
#     await db.commit()
#     await db.refresh(db_vendor)
#     return db_vendor

# # Read specific vendor
# # @app.get("/vendors/{vendor_id}", response_model=VendorRead)
# # async def read_vendor(vendor_id: int, db: AsyncSession = Depends(get_db)):
# #     result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
# #     vendor = result.scalars().first()
# #     if vendor is None:
# #         raise HTTPException(status_code=404, detail="Vendor not found")
# #     return vendor

# @app.get("/vendors/{vendor_id}", response_model=VendorRead)
# async def read_vendor(vendor_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
#     vendor = result.scalars().first()
#     if vendor is None:
#         raise HTTPException(status_code=404, detail="Vendor not found")
#     return vendor


# # Update specific vendor
# @app.put("/vendors/{vendor_id}", response_model=VendorRead)
# async def update_vendor(vendor_id: int, vendor: VendorUpdate, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
#     db_vendor = result.scalars().first()
#     if db_vendor is None:
#         raise HTTPException(status_code=404, detail="Vendor not found")
#     for key, value in vendor.dict(exclude_unset=True).items():
#         setattr(db_vendor, key, value)
#     await db.commit()
#     await db.refresh(db_vendor)
#     return db_vendor

# # Delete specific vendor
# @app.delete("/vendors/{vendor_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_vendor(vendor_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
#     db_vendor = result.scalars().first()
#     if db_vendor is None:
#         raise HTTPException(status_code=404, detail="Vendor not found")
#     await db.execute(delete(Vendors).where(Vendors.vendor_id == vendor_id))
#     await db.commit()
#     return None

# # Create role
# @app.post("/roles/", response_model=RoleRead, status_code=status.HTTP_201_CREATED)
# async def create_role(role: RoleCreate, db: AsyncSession = Depends(get_db)):
#     db_role = Role(**role.dict())
#     db.add(db_role)
#     await db.commit()
#     await db.refresh(db_role)
#     return db_role

# # Read all roles
# @app.get("/roles/", response_model=List[RoleRead])
# async def read_all_roles(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Role))
#     roles = result.scalars().all()
#     return roles

# # Read role
# @app.get("/roles/{role_id}", response_model=RoleRead)
# async def read_role(role_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Role).where(Role.role_id == role_id))
#     role = result.scalars().first()
#     if role is None:
#         raise HTTPException(status_code=404, detail="Role not found")
#     return role

# # Update role
# @app.put("/roles/{role_id}", response_model=RoleRead)
# async def update_role(role_id: int, role: RoleUpdate, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Role).where(Role.role_id == role_id))
#     db_role = result.scalars().first()
#     if db_role is None:
#         raise HTTPException(status_code=404, detail="Role not found")
#     for key, value in role.dict(exclude_unset=True).items():
#         setattr(db_role, key, value)
#     await db.commit()
#     await db.refresh(db_role)
#     return db_role

# # Delete role
# @app.delete("/roles/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_role(role_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Role).where(Role.role_id == role_id))
#     db_role = result.scalars().first()
#     if db_role is None:
#         raise HTTPException(status_code=404, detail="Role not found")
#     await db.execute(delete(Role).where(Role.role_id == role_id))
#     await db.commit()
#     return None

# # Create service
# @app.post("/services/", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
# async def create_service(service: ServiceCreate, db: AsyncSession = Depends(get_db)):
#     db_service = Service(**service.dict())
#     db.add(db_service)
#     await db.commit()
#     await db.refresh(db_service)
#     return db_service

# # Read all services
# @app.get("/services/", response_model=List[ServiceRead])
# async def read_all_services(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Service))
#     services = result.scalars().all()
#     return services

# # Read service
# @app.get("/services/{service_id}", response_model=ServiceRead)
# async def read_service(service_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Service).where(Service.service_id == service_id))
#     service = result.scalars().first()
#     if service is None:
#         raise HTTPException(status_code=404, detail="Service not found")
#     return service

# # Update service
# @app.put("/services/{service_id}", response_model=ServiceRead)
# async def update_service(service_id: int, service: ServiceUpdate, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Service).where(Service.service_id == service_id))
#     db_service = result.scalars().first()
#     if db_service is None:
#         raise HTTPException(status_code=404, detail="Service not found")
#     for key, value in service.model_dump(exclude_unset=True).items():
#         setattr(db_service, key, value)
#     await db.commit()
#     await db.refresh(db_service)
#     return db_service

# # Delete service
# @app.delete("/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Service).where(Service.service_id == service_id))
#     db_service = result.scalars().first()
#     if db_service is None:
#         raise HTTPException(status_code=404, detail="Service not found")
#     await db.execute(delete(Service).where(Service.service_id == service_id))
#     await db.commit()
#     return None

# # Create organization
# @app.post("/organizations/", response_model=OrganizationRead, status_code=status.HTTP_201_CREATED)
# async def create_organization(organization: OrganizationCreate, db: AsyncSession = Depends(get_db)):
#     db_organization = Organization(**organization.model_dump())
#     db.add(db_organization)
#     await db.commit()
#     await db.refresh(db_organization)
#     return db_organization

# # Read organization
# @app.get("/organizations/{org_id}", response_model=OrganizationRead)
# async def read_organization(org_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
#     organization = result.scalars().first()
#     if organization is None:
#         raise HTTPException(status_code=404, detail="Organization not found")
#     return organization

# # Read all organizations
# @app.get("/organizations/", response_model=List[OrganizationRead])
# async def read_all_organizations(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Organization))
#     organizations = result.scalars().all()
#     return organizations

# # Update organization
# @app.put("/organizations/{org_id}", response_model=OrganizationRead)
# async def update_organization(org_id: int, organization: OrganizationUpdate, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
#     db_organization = result.scalars().first()
#     if db_organization is None:
#         raise HTTPException(status_code=404, detail="Organization not found")
#     for key, value in organization.model_dump(exclude_unset=True).items():
#         setattr(db_organization, key, value)
#     await db.commit()
#     await db.refresh(db_organization)
#     return db_organization

# # Delete organization
# @app.delete("/organizations/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_organization(org_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
#     db_organization = result.scalars().first()
#     if db_organization is None:
#         raise HTTPException(status_code=404, detail="Organization not found")
#     await db.execute(delete(Organization).where(Organization.organization_id == org_id))
#     await db.commit()
#     return None

# # Read vendors by service ID
# @app.get("/vendors/service/{service_id}", response_model=List[VendorRead])
# async def read_vendors_by_service(service_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.service == service_id).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
#     vendors = result.scalars().all()
#     if not vendors:
#         raise HTTPException(status_code=404, detail="No vendors found for this service")
#     return vendors

# # Read vendors by role
# @app.get("/vendors/role/{role_id}", response_model=List[VendorRead])
# async def read_vendors_by_role(role_id: int, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.role == role_id).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
#     vendors = result.scalars().all()
#     return vendors

# # Read vendors by organization name
# @app.get("/vendors/organization/{organization_id}", response_model=List[VendorRead])
# async def read_vendors_by_organization(organization_id: str, db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Vendors).where(Vendors.organization == organization_id).options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj)))
#     vendors = result.scalars().all()
#     return vendors

# # Function to send email using Gmail SMTP
# async def send_email_function(subject: str, body: str, recipients: List[str]):
#     gmail_user = 'bitsilica001@gmail.com'
#     gmail_password = 'zwpzqdvugrekzgyh'

#     msg = MIMEMultipart()
#     msg['From'] = gmail_user
#     msg['To'] = ', '.join(recipients)
#     msg['Subject'] = subject
#     msg.attach(MIMEText(body, 'plain'))

#     try:
#         server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
#         server.login(gmail_user, gmail_password)
#         server.sendmail(gmail_user, recipients, msg.as_string())
#         server.close()
#         print('Email sent successfully')
#     except Exception as e:
#         print(f'Failed to send email. Error: {str(e)}')

# # Endpoint to send email to selected vendors
# @app.post("/send-gmail/", status_code=status.HTTP_200_OK)
# async def send_gmail(email_schema: EmailSchema, db: AsyncSession = Depends(get_db)):
#     recipients = []
#     for vendor_id in email_schema.vendor_ids:
#         result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
#         vendor = result.scalars().first()
#         if vendor:
#             recipients.append(vendor.email)

#     if recipients:
#         await send_email_function(email_schema.subject, email_schema.body, recipients)
#         return {"message": "Email sent successfully"}
#     else:
#         raise HTTPException(status_code=404, detail="No valid recipients found")
















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
from sqlalchemy import func 
from auth import verify_password, create_access_token, verify_token, get_password_hash, get_current_user
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from sqlalchemy.future import select


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
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)

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

class VendorUpdate(BaseModel):
    name: Optional[str]
    organization_name: Optional[str]
    role_name: Optional[str]
    service_name: Optional[str]
    phone: Optional[int]
    email: Optional[EmailStr]

class RoleCreate(BaseModel):
    role_name: str

class RoleRead(BaseModel):
    role_id: int
    role_name: str

    class Config:
        from_attributes = True

class RoleUpdate(BaseModel):
    role_name: Optional[str] = None

class ServiceCreate(BaseModel):
    service_name: str

class ServiceRead(BaseModel):
    service_id: int
    service_name: str

    class Config:
        from_attributes = True

class ServiceUpdate(BaseModel):
    service_name: Optional[str] = None

class OrganizationCreate(BaseModel):
    organization_name: str

class OrganizationRead(BaseModel):
    organization_id: int
    organization_name: str

    class Config:
        from_attributes = True

class OrganizationUpdate(BaseModel):
    organization_name: Optional[str] = None

class EmailSchema(BaseModel):
    subject: str
    body: str
    vendor_ids: List[int]    

class CreateUserRequest(BaseModel):
    name: str
    username: str
    password: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    user_id: int
    name: str
    username: str
    password: str
    role: str

    class Config:
        from_attributes = True

class UpdateUserRequest(BaseModel):
    name: Optional[str]
    username: Optional[str]
    password: Optional[str]
    role: Optional[str]


ACCESS_TOKEN_EXPIRE_MINUTES = 30

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


@app.post("/create_user")
async def create_user(user: CreateUserRequest, db: AsyncSession = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    db_user = Users(name=user.name, username=user.username, password=hashed_password, role=user.role)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(Users).filter(Users.username == form_data.username))
        user = result.scalars().first()

        if user is None or not verify_password(form_data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer", "role": user.role}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str, db: AsyncSession):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    username = verify_token(token, credentials_exception)
    query = select(Users).where(Users.username == username)
    result = await db.execute(query)
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    user = await get_current_user(token, db)
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return {"username": user.username, "role": user.role}

#Count users
@app.get("/users/count")
async def get_total_users(db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(func.count()).select_from(Users))
        total_users = result.scalar()
        return {"total_users": total_users}
    
# Read all users
@app.get("/users", response_model=List[UserResponse])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(Users))
        users = result.scalars().all()
        return users
    
#Update User
@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UpdateUserRequest, db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(Users).filter(Users.user_id == user_id))
        db_user = result.scalars().first()

        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if user.name:
            db_user.name = user.name
        if user.username:
            db_user.username = user.username
        if user.password:
            db_user.password = get_password_hash(user.password)
        if user.role:
            db_user.role = user.role

        await session.commit()
        await session.refresh(db_user)
        return db_user
    
#Delete User    
@app.delete("/users/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(Users).filter(Users.user_id == user_id))
        db_user = result.scalars().first()

        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        await session.delete(db_user)
        await session.commit()
        return {"message": "User deleted successfully"}

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

# # Create vendor endpoint
# @app.post("/vendors/")
# async def create_vendor(vendor: VendorCreate, db: AsyncSession = Depends(get_db)):
#     try:
#         # Check if organization exists, create if it doesn't
#         org_result = await db.execute(select(Organization).where(Organization.organization_name == vendor.organization_name))
#         organization = org_result.scalars().first()
#         if not organization:
#             organization = Organization(organization_name=vendor.organization_name)
#             db.add(organization)
#             await db.commit()
#             await db.refresh(organization)
        
#         # Check if role exists, create if it doesn't
#         role_result = await db.execute(select(Role).where(Role.role_name == vendor.role_name))
#         role = role_result.scalars().first()
#         if not role:
#             role = Role(role_name=vendor.role_name)
#             db.add(role)
#             await db.commit()
#             await db.refresh(role)
        
#         # Check if service exists, create if it doesn't
#         service_result = await db.execute(select(Service).where(Service.service_name == vendor.service_name))
#         service = service_result.scalars().first()
#         if not service:
#             service = Service(service_name=vendor.service_name)
#             db.add(service)
#             await db.commit()
#             await db.refresh(service)

#         new_vendor = Vendors(
#             name=vendor.name,
#             organization=organization.organization_id,
#             role=role.role_id,
#             service=service.service_id,
#             phone=vendor.phone,
#             email=vendor.email
#         )
#         db.add(new_vendor)
#         await db.commit()
#         await db.refresh(new_vendor)
#         return new_vendor
#     except IntegrityError:
#         await db.rollback()
#         raise HTTPException(status_code=400, detail="Email already exists.")


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

        response_vendor = VendorRead(
            vendor_id=new_vendor.vendor_id,
            name=new_vendor.name,
            organization_name=organization.organization_name,
            role_name=role.role_name,
            service_name=service.service_name,
            phone=new_vendor.phone,
            email=new_vendor.email
        )
        return response_vendor

    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists.")


#Count Vendors
@app.get("/vendors/count")
async def get_total_vendors(db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(func.count()).select_from(Vendors))
        total_vendors = result.scalar()
        return {"total_vendors": total_vendors}

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

# Update vendor endpoint
@app.put("/vendors/{vendor_id}")
async def update_vendor(vendor_id: int, vendor_update: VendorUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
    vendor = result.scalars().first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    # Update fields if provided
    if vendor_update.name is not None:
        vendor.name = vendor_update.name
    if vendor_update.organization_name is not None:
        org_result = await db.execute(select(Organization).where(Organization.organization_name == vendor_update.organization_name))
        organization = org_result.scalars().first()
        if not organization:
            organization = Organization(organization_name=vendor_update.organization_name)
            db.add(organization)
            await db.commit()
            await db.refresh(organization)
        vendor.organization = organization.organization_id
    if vendor_update.role_name is not None:
        role_result = await db.execute(select(Role).where(Role.role_name == vendor_update.role_name))
        role = role_result.scalars().first()
        if not role:
            role = Role(role_name=vendor_update.role_name)
            db.add(role)
            await db.commit()
            await db.refresh(role)
        vendor.role = role.role_id
    if vendor_update.service_name is not None:
        service_result = await db.execute(select(Service).where(Service.service_name == vendor_update.service_name))
        service = service_result.scalars().first()
        if not service:
            service = Service(service_name=vendor_update.service_name)
            db.add(service)
            await db.commit()
            await db.refresh(service)
        vendor.service = service.service_id
    if vendor_update.phone is not None:
        vendor.phone = vendor_update.phone
    if vendor_update.email is not None:
        vendor.email = vendor_update.email

    db.add(vendor)
    await db.commit()
    await db.refresh(vendor)

    return vendor

# Delete specific vendor 
@app.delete("/vendors/{vendor_id}")
async def delete_vendor(vendor_id: int, db: AsyncSession = Depends(get_db)):
    async with db.begin() as transaction:
        # Check if the vendor exists
        result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
        db_vendor = result.scalars().first()
        if db_vendor is None:
            raise HTTPException(status_code=404, detail="Vendor not found")

        # Delete the vendor
        await db.execute(delete(Vendors).where(Vendors.vendor_id == vendor_id))

        # Check if the organization, role, and service are referenced by other vendors
        org_count = await db.scalar(select(func.count()).where(Vendors.organization == db_vendor.organization))
        role_count = await db.scalar(select(func.count()).where(Vendors.role == db_vendor.role))
        service_count = await db.scalar(select(func.count()).where(Vendors.service == db_vendor.service))

        # Delete organization if not referenced by other vendors
        if org_count == 0:
            await db.execute(delete(Organization).where(Organization.organization_id == db_vendor.organization))

        # Delete role if not referenced by other vendors
        if role_count == 0:
            await db.execute(delete(Role).where(Role.role_id == db_vendor.role))

        # Delete service if not referenced by other vendors
        if service_count == 0:
            await db.execute(delete(Service).where(Service.service_id == db_vendor.service))

    return {"message": f"Vendor with ID {vendor_id} deleted successfully."}

# Create role
@app.post("/roles/", response_model=RoleRead, status_code=status.HTTP_201_CREATED)
async def create_role(role: RoleCreate, db: AsyncSession = Depends(get_db)):
    db_role = Role(**role.dict())
    db.add(db_role)
    await db.commit()
    await db.refresh(db_role)
    return db_role

# Read all roles
@app.get("/roles/", response_model=List[RoleRead])
async def read_all_roles(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role))
    roles = result.scalars().all()
    return roles

# Read role
@app.get("/roles/{role_id}", response_model=RoleRead)
async def read_role(role_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role).where(Role.role_id == role_id))
    role = result.scalars().first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

# Update role
@app.put("/roles/{role_id}", response_model=RoleRead)
async def update_role(role_id: int, role: RoleUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role).where(Role.role_id == role_id))
    db_role = result.scalars().first()
    if db_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    for key, value in role.dict(exclude_unset=True).items():
        setattr(db_role, key, value)
    await db.commit()
    await db.refresh(db_role)
    return db_role

# Delete role
@app.delete("/roles/{role_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_role(role_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role).where(Role.role_id == role_id))
    db_role = result.scalars().first()
    if db_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    await db.execute(delete(Role).where(Role.role_id == role_id))
    await db.commit()
    return None

# Create service
@app.post("/services/", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
async def create_service(service: ServiceCreate, db: AsyncSession = Depends(get_db)):
    db_service = Service(**service.dict())
    db.add(db_service)
    await db.commit()
    await db.refresh(db_service)
    return db_service

#Count Services
@app.get("/services/count")
async def get_total_services(db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(func.count()).select_from(Service))
        total_services = result.scalar()
        return {"total_services": total_services}
    
# Read all services
@app.get("/services/", response_model=List[ServiceRead])
async def read_all_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service))
    services = result.scalars().all()
    return services

# Read service
@app.get("/services/{service_id}", response_model=ServiceRead)
async def read_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalars().first()
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# Update service
@app.put("/services/{service_id}", response_model=ServiceRead)
async def update_service(service_id: int, service: ServiceUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    db_service = result.scalars().first()
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    for key, value in service.dict(exclude_unset=True).items():
        setattr(db_service, key, value)
    await db.commit()
    await db.refresh(db_service)
    return db_service

# Delete service
@app.delete("/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    db_service = result.scalars().first()
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    await db.execute(delete(Service).where(Service.service_id == service_id))
    await db.commit()
    return None

# Create organization
@app.post("/organizations/", response_model=OrganizationRead, status_code=status.HTTP_201_CREATED)
async def create_organization(organization: OrganizationCreate, db: AsyncSession = Depends(get_db)):
    db_organization = Organization(**organization.model_dump())
    db.add(db_organization)
    await db.commit()
    await db.refresh(db_organization)
    return db_organization

#Count Organizations
@app.get("/organizations/count")
async def get_total_organizations(db: AsyncSession = Depends(get_db)):
    async with db as session:
        result = await session.execute(select(func.count()).select_from(Organization))
        total_organizations = result.scalar()
        return {"total_organizations": total_organizations}

# Read organization
@app.get("/organizations/{org_id}", response_model=OrganizationRead)
async def read_organization(org_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
    organization = result.scalars().first()
    if organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return organization

# Read all organizations
@app.get("/organizations/", response_model=List[OrganizationRead])
async def read_all_organizations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organization))
    organizations = result.scalars().all()
    return organizations

# Update organization
@app.put("/organizations/{org_id}", response_model=OrganizationRead)
async def update_organization(org_id: int, organization: OrganizationUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
    db_organization = result.scalars().first()
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    for key, value in organization.model_dump(exclude_unset=True).items():
        setattr(db_organization, key, value)
    await db.commit()
    await db.refresh(db_organization)
    return db_organization

# Delete organization
@app.delete("/organizations/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_organization(org_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organization).where(Organization.organization_id == org_id))
    db_organization = result.scalars().first()
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    await db.execute(delete(Organization).where(Organization.organization_id == org_id))
    await db.commit()
    return None

# Read vendors by service ID
@app.get("/vendors/service/{service_id}", response_model=List[VendorRead])
async def read_vendors_by_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Vendors)
        .where(Vendors.service == service_id)
        .options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj))
    )
    vendors = result.scalars().all()
    if not vendors:
        raise HTTPException(status_code=404, detail="No vendors found for this service")
    
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

# Read vendors by role
@app.get("/vendors/role/{role_id}", response_model=List[VendorRead])
async def read_vendors_by_role(role_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Vendors)
        .where(Vendors.role == role_id)
        .options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj))
    )
    vendors = result.scalars().all()
    
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

# Read vendors by organization name
@app.get("/vendors/organization/{organization_id}", response_model=List[VendorRead])
async def read_vendors_by_organization(organization_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Vendors)
        .where(Vendors.organization == organization_id)
        .options(selectinload(Vendors.organization_obj), selectinload(Vendors.role_obj), selectinload(Vendors.service_obj))
    )
    vendors = result.scalars().all()
    
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


# Function to send email using Gmail SMTP
async def send_email_function(subject: str, body: str, recipients: List[str]):
    gmail_user = 'bitsilica001@gmail.com'
    gmail_password = 'zwpzqdvugrekzgyh'

    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = ', '.join(recipients)
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, recipients, msg.as_string())
        server.close()
        print('Email sent successfully')
    except Exception as e:
        print(f'Failed to send email. Error: {str(e)}')

# Endpoint to send email to selected vendors
@app.post("/send-gmail/", status_code=status.HTTP_200_OK)
async def send_gmail(email_schema: EmailSchema, db: AsyncSession = Depends(get_db)):
    recipients = []
    for vendor_id in email_schema.vendor_ids:
        result = await db.execute(select(Vendors).where(Vendors.vendor_id == vendor_id))
        vendor = result.scalars().first()
        if vendor:
            recipients.append(vendor.email)

    if recipients:
        await send_email_function(email_schema.subject, email_schema.body, recipients)
        return {"message": "Email sent successfully"}
    else:
        raise HTTPException(status_code=404, detail="No valid recipients found")


