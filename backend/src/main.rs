#[macro_use] extern crate rocket;
use rocket::serde::json::Json;
use rocket::response::Redirect;
use serde::Serialize;

mod cors;
use cors::CORS;

#[derive(Serialize, Clone)]
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

#[get("/api?<count>")]
fn api(count: Option<i32>) -> Json<Vec<TestData>> {
  match count {
    Some(c) => Json(vec![TestData::new(); c as usize]),
    None => Json(vec![TestData::new()]),
  }
}

#[get("/")]
fn index() -> Redirect {
  Redirect::to("/api")
}

#[launch]
fn server() -> _ {
  rocket::build()
    .mount("/", routes![index, api])
    .attach(CORS)
}
