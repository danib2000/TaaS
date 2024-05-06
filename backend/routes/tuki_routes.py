from typing_extensions import Annotated
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from database.db_handler import DBHandler
from consts import DB_URL

router = APIRouter()
db_handler = DBHandler(DB_URL)


@router.get("/")
def get_all_tukis():
    """
        Retrieve all tukis.

        Returns:
            dict: A dictionary containing the tukis list as value of data key.

        Raises:
            HTTPException: If no tukis are found, a 404 HTTPException is raised with a detail message.
                           If there's a database error, a 500 HTTPException is raised with a detail message
                           For any other unexpected exceptions, a 500 HTTPException is raised with the exception message.
    """
    try:
        tukis = db_handler.get_all_tukis()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not tukis:
        raise HTTPException(status_code=404, detail="Tuki not found")

    return {"data": tukis}
