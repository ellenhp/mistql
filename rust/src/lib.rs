pub mod eval;
pub mod parse;

pub fn query_value(
    query_str: String,
    data: serde_json::Value,
) -> Result<serde_json::Value, String> {
    match parse::expr(&query_str) {
        Ok((_, ast)) => ast.evaluate(&data),
        Err(err) => Err(err.to_string()),
    }
}

pub fn query(query_str: String, data_str: String) -> Result<serde_json::Value, String> {
    match serde_json::from_str(&data_str) {
        Ok(data) => query_value(query_str, data),
        Err(_) => Err("Invalid JSON data".to_string()),
    }
}
