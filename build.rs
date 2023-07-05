use std::process::Command;

fn main() {
    println!("Building Tailwind CSS...");
    Command::new("tailwindcss")
        .args(&[
            "build",
            "-i",
            "./templates/app.css",
            "-o",
            "./static/css/app.css",
            "-c",
            "./tailwind.config.js",
        ])
        .status()
        .expect("Failed to build Tailwind CSS");
}
