use std::net::TcpListener;

use actix_files::Files;
use actix_web::{dev::Server, web, App, HttpServer};
use sqlx::PgPool;
use tera::Tera;

use crate::routes::{index, create_item};

pub fn run(listener: TcpListener, db_pool: PgPool) -> Result<Server, std::io::Error> {
    let db_pool = web::Data::new(db_pool);

    let server = HttpServer::new(move || {
        let tera = Tera::new("templates/**/*").expect("Failed to load templates");
        let templates = web::Data::new(tera);
        
        App::new()
            .route("/", web::get().to(index))
            .route("/", web::post().to(create_item))
            .service(Files::new("/static", "./static"))
            .app_data(db_pool.clone())
            .app_data(templates)
    })
    .listen(listener)?
    .run();

    return Ok(server);
}
