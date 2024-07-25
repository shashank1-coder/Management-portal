from sqlalchemy import create_engine, select, update, delete, Integer, String, Column, ForeignKey, Table
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, selectinload
from sqlalchemy.exc import IntegrityError



# SQLAlchemy configuration
DATABASE_URL = "sqlite+aiosqlite:///db.sqlite3"
engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
Base = declarative_base()