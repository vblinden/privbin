use std::net::TcpListener;

use senderoni::{configuration::get_configuration, startup::run};
use sqlx::PgPool;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let configuration = get_configuration().expect("Failed to read configuration");
    let connection_pool = PgPool::connect(&configuration.database.connection_string())
        .await
        .expect("Failed to connect to database");

    let address = format!("0.0.0.0:{}", configuration.application_port);
    let listener = TcpListener::bind(&address).expect("Failed to bind to port 8080");

    println!("Starting server on port {}", address);

    return run(listener, connection_pool)?.await;
}
