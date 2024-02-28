use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::{thread, time};
use std::net::IpAddr;

fn main() {
    println!("Hello, world!");

    let mut program = Program::new();
    program.start();

    thread::sleep(time::Duration::from_millis(500));

    program.set_froms(vec!["192.168.82.3".parse().unwrap()]);
    program.set_tos(vec!["10.147.20.190".parse().unwrap(), "192.168.196.192".parse().unwrap()]);
    println!("main program");

    thread::sleep(time::Duration::from_millis(5_000));

    program.stop();
    println!("stopped");

    thread::sleep(time::Duration::from_millis(2_000));

    println!("The End");
}

struct Program {
    source_addrs: Arc<Mutex<Vec<IpAddr>>>,
    dest_addrs: Arc<Mutex<Vec<IpAddr>>>,
    handle: Option<thread::JoinHandle<()>>,
    running: Arc<AtomicBool>,
}

//  let mut in_packet: Vec<u8> = Vec::with_capacity(args.max_packet_size);


impl Program {
    pub fn new() -> Self {
        Self {
            handle: None,
            running: Arc::new(AtomicBool::new(false)),
            source_addrs: Arc::new(Mutex::new(vec![])),
            dest_addrs: Arc::new(Mutex::new(vec![])),
        }
    }

    pub fn start(&mut self) {
        println!("Starting");

        self.running.store(true, Ordering::Relaxed);

        let running = self.running.clone();
        let froms  = self.source_addrs.clone();
        let tos  = self.dest_addrs.clone();

        self.handle = Some(thread::spawn(move || {
            while running.load(Ordering::SeqCst) {
                {
                    let froms = froms.lock().unwrap();
                    let tos = tos.lock().unwrap();

                    println!("forward: {:?} -> {:?}", froms, tos);
                }

                thread::sleep(time::Duration::from_millis(1_000));
            }
        }));
    }

    pub fn stop(&mut self) {
        println!("stopping");
        self.running.store(false, Ordering::SeqCst);
        self.handle
            .take()
            .expect("Called stop on not running thread")
            .join()
            .expect("Could not join spawned thread")
    }

    pub fn set_froms(&self, addrs: Vec<IpAddr>) {
        let inner = self.source_addrs.clone();
        let mut inner = inner.lock().unwrap();
        *inner = addrs;
    }

    pub fn set_tos(&self, addrs: Vec<IpAddr>) {
        let inner = self.dest_addrs.clone();
        let mut inner = inner.lock().unwrap();
        *inner = addrs;
    }
}
