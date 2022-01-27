#[macro_use] extern crate rocket;
use rocket::serde::json::Json;
use rocket::response::Redirect;
use rocket::http::Status;
use serde::{Serialize, Deserialize};

mod cors;
use cors::CORS;

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Invoice {
  id: Option<u64>,
  name: String,
  payee: String,
  account: String,
  reference: String,
  amount: f32,
  date: String,
}

impl Invoice {
  pub fn new() -> Self {
    Self {
      id: Some(2),
      name: "Rocket".to_string(),
      payee: "Rocket.rs".to_string(),
      account: "FI24 34343 22424 46".to_string(),
      reference: "54544343443".to_string(),
      amount: 45.42,
      date: "2022-02-09".to_string(),
    }
  }
}

#[get("/invoices?<count>")]
fn invoices(count: Option<i32>) -> Json<Vec<Invoice>> {
  match count {
    Some(c) => Json(vec![Invoice::new(); c as usize]),
    None => Json(vec![Invoice::new()]),
  }
}

#[post("/invoices", data = "<invoice>")]
fn add_invoice(invoice: Json<Invoice>) -> Status {
  println!("{:?}", invoice);
  Status::Created
}

#[get("/")]
fn index() -> Redirect {
  Redirect::to("/api/v1/invoices")
}

#[launch]
fn server() -> _ {
  rocket::build()
    .mount("/", routes![index])
    .mount("/api/v1", routes![invoices, add_invoice])
    .attach(CORS)
}
