from app import create_app

import pymysql
pymysql.install_as_MySQLdb()

app = create_app()

if __name__ == '__main__':
    app.run()
