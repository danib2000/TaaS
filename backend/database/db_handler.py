from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.tuki import Base, Tuki


class DBHandler:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.session = sessionmaker(bind=self.engine)

    def init_tables(self):
        """
        Initialize the database tables.
        """
        Base.metadata.drop_all(self.engine)
        Base.metadata.create_all(self.engine)

    def add_tuki(self, name, type, image_source):
        """
        Add a new Tuki record to the tuki table.

        Args:
            name (str): The name of the Tuki.
            type (str): The type of the Tuki.
            image_source (str): The image source of the Tuki.
        """
        with self.session() as session:
            new_tuki = Tuki(name=name, type=type, image_source=image_source)
            session.add(new_tuki)
            session.commit()

    def get_all_tukis(self):
        """
        Retrieve all Tuki records from the tuki table.

        Returns:
            list: A list of Tuki records.
        """
        with self.session() as session:
            tukis = session.query(Tuki).all()

        return tukis

    def get_tukis_by_name(self, name):
        """
        Retrieve Tuki records from the database by name.

        Args:
            name (str): The name of the Tuki.

        Returns:
            list: A list of Tuki records with the specified name.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.name == name).all()

    def get_tukis_by_type(self, type):
        """
        Retrieve Tuki records from the database by type.

        Args:
            type (str): The type of the Tuki.

        Returns:
            list: A list of Tuki records with the specified type.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.type == type).all()

    def get_tukis_by_name_and_type(self, name, type):
        """
        Retrieve Tuki records from the database by name and type.

        Args:
            name (str): The name of the Tuki.
            type (str): The type of the Tuki.

        Returns:
            list: A list of Tuki records with the specified name and type.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.type == type, Tuki.name == name).all()

    def delete_tukis_by_name(self, name):
        """
        Delete Tuki records from the database by name.

        Args:
            name (str): The name of the Tuki.

        Returns:
            int: The number of Tuki records deleted.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.name == name).delete()
            session.commit()

            return deleted_count

    def delete_tukis_by_type(self, type):
        """
        Delete Tuki records from the database by type.

        Args:
            type (str): The type of the Tuki.

        Returns:
            int: The number of Tuki records deleted.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.type == type).delete()
            session.commit()

            return deleted_count

    def delete_tukis_by_name_and_type(self, name, type):
        """
        Delete Tuki records from the database by name and type.

        Args:
            name (str): The name of the Tuki.
            type (str): The type of the Tuki.

        Returns:
            int: The number of Tuki records deleted.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.name == name, Tuki.type == type).delete()
            session.commit()

            return deleted_count


if __name__ == '__main__':
    from configs import DB_URL

    db_handler = DBHandler(DB_URL)
    # db_handler.init_tables()
    # print("tables created successfully")




