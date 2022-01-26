#[macro_use] extern crate rocket;
use rocket::serde::json::Json;
use serde::Serialize;

mod cors;
use cors::CORS;

#[derive(Serialize)]
struct TestData {
  id: u64,
  name: String,
  account: String,
}

impl TestData {
  pub fn new() -> Self {
    Self {
      id: 2,
      name: "Rocket".to_string(),
      account: "FI24 34343 22424 46".to_string(),
    }
  }
}

#[get("/api")]
fn index() -> Json<TestData> {
  Json(TestData::new())
}

#[launch]
fn api() -> _ {
  rocket::build()
    .mount("/", routes![index])
    .attach(CORS)
}
