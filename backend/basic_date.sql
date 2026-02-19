INSERT INTO halls (id, description, hall_name) VALUES
                                                   (1, 'Main exhibition hall', 'Hall A'),
                                                   (2, 'Secondary hall', 'Hall B'),
                                                   (3, 'Premium publishers hall', 'Hall C'),
                                                   (4, 'Outdoor temporary hall', 'Hall D'),
                                                   (5, 'Conference hall', 'Hall E');


INSERT INTO genres (id, name) VALUES
                                  (1, 'Fiction'),
                                  (2, 'Science'),
                                  (3, 'Technology'),
                                  (4, 'History'),
                                  (5, 'Children');

# Password is 1234
INSERT INTO users
(id, active, created_at, email, first_name, last_name, mobile_number, password, roles)
VALUES
    (1, 1, NOW(), 'surenthiransathurjan20@gmail.com', 'John', 'Silva', '94770000001',
     '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'EMPLOYEE'),

    (2, 1, NOW(), ‘ronald.ensilirukman.@gmail.com', 'Mary', 'Fernando', '94770000002',
     '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'PUBLISHER'),

    (3, 1, NOW(), 'arulmathumithan@gmail.com', 'Kumar', 'Perera', '94770000003',
     '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'VENDOR'),

    (4, 1, NOW(), 'devaniselva31@gmail.com', 'Anne', 'Dias', '94770000004',
     '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'EMPLOYEE'),

    (5, 1, NOW(), 'vkarush06@gmail.com', 'Raj', 'Kumar', '94770000005',
     '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'VENDOR');


INSERT INTO user_genre (user_id, genre_id) VALUES
                                               (1,1),
                                               (2,2),
                                               (3,3),
                                               (4,4),
                                               (5,5);


INSERT INTO stalls
(id, description, price, size, stall_name, status, hall_id, reserved_by_id)
VALUES
    (1,'Corner stall',15000,'SMALL','S-101','AVAILABLE',1,NULL),
    (2,'Near entrance',25000,'MEDIUM','S-102','RESERVED',1,2),
    (3,'Premium front stall',40000,'LARGE','S-103','BOOKED',2,3),
    (4,'Budget stall',12000,'SMALL','S-104','AVAILABLE',3,NULL),
    (5,'Central stall',30000,'MEDIUM','S-105','RESERVED',2,5);


INSERT INTO reservations
(id, qr_code, reservation_date, status, total_amount, user_id)
VALUES
    (1,'QR001',NOW(),'CONFIRMED',15000,2),
    (2,'QR002',NOW(),'PENDING_PAYMENT',25000,3),
    (3,'QR003',NOW(),'CONFIRMED',40000,5),
    (4,'QR004',NOW(),'CANCELLED',12000,1),
    (5,'QR005',NOW(),'EXPIRED',30000,4);


INSERT INTO reservation_stalls
(id, reservation_id, stall_id)
VALUES
    (1,1,2),
    (2,2,3),
    (3,3,5),
    (4,4,4),
    (5,5,1);


INSERT INTO payments
(id, amount, gateway_response, payment_date, payment_method,
 payment_status, reference_number, transaction_id, reservation_id, user_id)
VALUES
    (1,15000,'OK',NOW(),'CARD','COMPLETED','REF001','TXN001',1,2),
    (2,25000,'WAITING',NOW(),'CARD','PENDING','REF002','TXN002',2,3),
    (3,40000,'OK',NOW(),'BANK','COMPLETED','REF003','TXN003',3,5),
    (4,12000,'FAILED',NOW(),'CARD','FAILED','REF004','TXN004',4,1),
    (5,30000,'REFUND',NOW(),'CARD','REFUNDED','REF005','TXN005',5,4);