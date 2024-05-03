from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.tuki import Base, Tuki
from consts import DB_URL


class DBHandler:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.session = sessionmaker(bind=self.engine)

    def create_tables(self):
        Base.metadata.drop_all(self.engine)
        Base.metadata.create_all(self.engine)

    def add_tuki(self, name, type, image_source):
        with self.session() as session:
            new_tuki = Tuki(name=name, type=type, image_source=image_source)
            session.add(new_tuki)

            session.commit()

    def get_all_tukis(self):
        with self.session() as session:
            tukis = session.query(Tuki).all()

        return tukis

    def get_tuki_by_name(self, name):
        """
        Retrieve Tuki records from the database by name.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.name == name).all()

    def get_tuki_by_type(self, type):
        """
        Retrieve Tuki records from the database by type.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.type == type).all()

    def get_tuki_by_name_and_type(self, name, type):
        """
        Retrieve Tuki records from the database by name and type.
        """
        with self.session() as session:
            return session.query(Tuki).filter(Tuki.type == type, Tuki.name == name).all()

    def delete_tuki_by_name(self, name):
        """
        Delete Tuki records from the database by name.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.name == name).delete()
            session.commit()

            return deleted_count

    def delete_tuki_by_type(self, type):
        """
        Delete Tuki records from the database by type.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.type == type).delete()
            session.commit()

            return deleted_count

    def delete_tuki_by_name_and_type(self, name, type):
        """
        Delete Tuki records from the database by name and type.
        """
        with self.session() as session:
            deleted_count = session.query(Tuki).filter(Tuki.name == name, Tuki.type == type).delete()
            session.commit()

            return deleted_count


if __name__ == '__main__':
    db_handler = DBHandler(DB_URL)
    # db_handler.create_tables()
    # print("tables created successfully")
    db_handler.add_tuki("yosi", "kon", "img.src")
    x = db_handler.get_tuki_by_name("yosi")
    print(x)

    x = db_handler.get_tuki_by_type("green cheek")
    print(x)

    x = db_handler.get_tuki_by_type("kon")
    print(x)

    x = db_handler.get_tuki_by_name_and_type("moshon", "green cheek")
    print(x)

    x = db_handler.delete_tuki_by_name_and_type("yosi","kon")
    print(x)

    x = db_handler.get_tuki_by_name_and_type("yosi","kon")
    print(x)
