FROM rust:1.70 as builder

WORKDIR /privbin

COPY ./Cargo.lock .
COPY ./Cargo.toml .

RUN mkdir ./src && echo 'fn main() { println!("Dummy!"); }' > ./src/main.rs
RUN echo 'fn run() { println!("Dummy!"); }' > ./src/lib.rs
RUN cargo build --release

RUN rm -rf ./src
COPY ./src ./src

RUN touch -a -m ./src/main.rs
RUN touch -a -m ./src/lib.rs
RUN cargo build --release

FROM debian:stable-slim
COPY --from=builder /privbin/target/release/privbin .
COPY --from=builder /privbin/static ./static	
COPY --from=builder /privbin/templates ./templates
CMD ["./privbin"]
