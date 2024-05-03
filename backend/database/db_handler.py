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


if __name__ == '__main__':
    db_handler = DBHandler(DB_URL)
    # db_handler.create_tables()
    # print("tables created successfully")