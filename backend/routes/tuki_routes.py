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
            HTTPException: If no Tukis are found for the specified name, a 404 HTTPException is raised.
                           If there's a database error, a 500 HTTPException is raised.
                           For any other unexpected exceptions, a 500 HTTPException is raised.
                           All the exceptions are raised with a detail message.
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


@router.get("/name/{name}")
def get_tukis_by_name(name: str):
    """
        Retrieve Tukis by name.

        Args:
            name (str): The name of the tuki to retrieve.

        Returns:
            dict: A dictionary containing the tukis list as value of 'data' key.

        Raises:
            HTTPException: If no Tukis are found for the specified name, a 404 HTTPException is raised.
                           If there's a database error, a 500 HTTPException is raised.
                           For any other unexpected exceptions, a 500 HTTPException is raised.
                           All the exceptions are raised with a detail message.
    """
    try:
        tukis = db_handler.get_tukis_by_name(name)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not tukis:
        raise HTTPException(status_code=404, detail=f"Tukis not found for name - {name}")

    return {"data": tukis}

