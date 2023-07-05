use actix_web::{
    web::{self, Redirect},
    HttpResponse,
};
use chrono::Utc;
use sqlx::PgPool;
use tera::{Context, Tera};
use uuid::Uuid;

#[derive(serde::Serialize)]
struct Item {
    id: String,
    content: String,
}

pub async fn index(templates: web::Data<Tera>, pool: web::Data<PgPool>) -> HttpResponse {
    return match sqlx::query!(
        r#"
        SELECT * FROM items ORDER BY created_at DESC
        "#,
    )
    .fetch_all(pool.get_ref())
    .await
    {
        Ok(items) => {
            let mut context = Context::new();
            context.insert(
                "items",
                &items
                    .into_iter()
                    .map(|item| Item {
                        id: item.id.to_string(),
                        content: item.content,
                    })
                    .collect::<Vec<Item>>(),
            );

            return HttpResponse::Ok()
                .content_type("text/html")
                .body(templates.render("index.html", &context).unwrap());
        }
        Err(e) => {
            println!("Failed to execute query: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    };
}

#[derive(serde::Deserialize)]
pub struct CreateItemParams {
    content: String,
}

pub async fn create_item(
    pool: web::Data<PgPool>,
    params: web::Form<CreateItemParams>,
) -> HttpResponse {
    return match sqlx::query!(
        r#"
        INSERT INTO items (id, content, exposure, language, private, password, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        "#,
        Uuid::new_v4(),
        params.content,
        "public",
        "rust",
        false,
        false,
        Utc::now(),
    )
    .execute(pool.get_ref())
    .await
    {
        Ok(_) => HttpResponse::Found()
            .append_header(("Location", "/"))
            .finish(),

        Err(e) => {
            println!("Failed to execute query: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    };
}
