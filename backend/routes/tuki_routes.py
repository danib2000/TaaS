from typing_extensions import Annotated
from fastapi import APIRouter, Body, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from database.db_handler import DBHandler
from configs import DB_URL
from logger_file import logger

router = APIRouter()
db_handler = DBHandler(DB_URL)


@router.get("/")
def get_all_tukis():
    """
    Retrieve all tukis from rds.

    Returns:
        dict: A dictionary containing the tukis list as value of data key.

    Raises:
        HTTPException: If no Tukis are found for the specified name, a 404 HTTPException is raised.
                       If there's a database error, a 500 HTTPException is raised.
                       For any other unexpected exceptions, a 500 HTTPException is raised.
                       All the exceptions are raised with a detail message.
    """
    try:
        logger.info("")
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
    Retrieve from rds Tukis by name.

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


@router.get("/type/{type}")
def get_tukis_by_type(type: str):
    """
    Retrieve from rds Tukis by type.

    Args:
        type (str): The type of the tukis to retrieve.

    Returns:
        dict: A dictionary containing the tukis list as value of 'data' key.

    Raises:
        HTTPException: If no Tukis are found for the specified type, a 404 HTTPException is raised.
                       If there's a database error, a 500 HTTPException is raised.
                       For any other unexpected exceptions, a 500 HTTPException is raised.
                       All the exceptions are raised with a detail message.
    """
    try:
        tukis = db_handler.get_tukis_by_type(type)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not tukis:
        raise HTTPException(status_code=404, detail=f"Tukis not found for type - {type}")

    return {"data": tukis}


@router.post("/", status_code=201)
def create_tuki(name: Annotated[str, Body()], type: Annotated[str, Body()], image_source: Annotated[str, Body()]):
    """
    Create a new Tuki in the rds table with the name, type and image_source specified in the request body.

    Args:
        name (str): The name of the Tuki.
        type (str): The type of the Tuki.
        image_source (str): The image source of the Tuki.

    Returns:
        dict: A dictionary containing the success message with status code 201 created.

    Raises:
        HTTPException: If there's a database error, a 500 HTTPException is raised with a detail message indicating
                       "Database error" and the specific error message.
                       If there's a validation error due to missing or invalid input data, FastAPI will automatically
                       raise a 422 HTTPException with details about the validation error.
                       For any other unexpected exceptions, a 500 HTTPException is raised with the exception message.
    """
    try:
        db_handler.add_tuki(name, type, image_source)
        return {"message": "Tuki created successfully"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/name/{name}")
def delete_tukis_by_name(name: str):
    """
    Delete from the rds Tukis by name.

    Args:
        name (str): The name of the Tuki to delete.

    Returns:
        dict: A dictionary containing a success message.

    Raises:
        HTTPException: If no Tukis are found for the specified name and no deletion was made, a 404 HTTPException
                       is raised. If there's a database error, a 500 HTTPException is raised.
                       For any other unexpected exceptions, a 500 HTTPException is raised.
                       All the exceptions are raised with a detail message.
    """
    try:
        logger.info(f"Received request to delete Tukis by name: {name}")
        deleted_count = db_handler.delete_tukis_by_name(name)
        logger.info(f"{deleted_count} Tukis deleted")
    except SQLAlchemyError as e:
        logger.error(f"Failed to delete Tukis by name: {name}. Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        logger.error(f"Failed to delete Tukis by name: {name}. Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Tukis not found for name - {name}")

    return {"message": f"{deleted_count} Tukis deleted successfully"}


@router.delete("/type/{type}")
def delete_tukis_by_type(type: str):
    """
    Delete from the rds Tukis by type.

    Args:
        type (str): The type of the Tuki to delete.

    Returns:
        dict: A dictionary containing the success message.

    Raises:
        HTTPException: If no Tukis are found for the specified type and no deletion was made, a 404 HTTPException
                       is raised. If there's a database error, a 500 HTTPException is raised.
                       For any other unexpected exceptions, a 500 HTTPException is raised.
                       All the exceptions are raised with a detail message.
    """
    try:
        deleted_count = db_handler.delete_tukis_by_type(type)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Tukis not found for type - {type}")

    return {"message": f"{deleted_count} Tukis deleted successfully"}


@router.delete("/id/{id}")
def delete_tuki_by_id(id: int):
    """
    Delete from the rds Tuki by id.

    Args:
        id (int): The id of the Tuki to delete.

    Returns:
        dict: A dictionary containing a success message.

    Raises:
        HTTPException: If no Tuki is found for the specified id and no deletion was made, a 404 HTTPException
                       is raised. If there's a database error, a 500 HTTPException is raised.
                       For any other unexpected exceptions, a 500 HTTPException is raised.
                       All the exceptions are raised with a detail message.
    """
    try:
        logger.info(f"Received request to delete Tuki by id: {id}")
        deleted_count = db_handler.delete_tuki_by_id(id)
        logger.info(f"{deleted_count} Tuki deleted")
    except SQLAlchemyError as e:
        logger.error(f"Failed to delete Tukis by id: {id}. Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        logger.error(f"Failed to delete Tukis by id: {id}. Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    if deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Tuki not found for id - {id}")

    return {"message": f"{deleted_count} Tuki deleted successfully"}