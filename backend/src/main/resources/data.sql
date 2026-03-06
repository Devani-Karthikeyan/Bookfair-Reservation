INSERT IGNORE INTO halls (hall_name, description) VALUES ('Hall 1', 'Main Hall Stage - Grand Auditorium');
INSERT IGNORE INTO halls (hall_name, description) VALUES ('Hall 2', 'Secondary Hall');
INSERT IGNORE INTO halls (hall_name, description) VALUES ('Hall 3', 'Exhibition Hall');

INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-L1', 'LARGE', 'AVAILABLE', 5000, 'Premium VIP Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-L2', 'LARGE', 'BOOKED', 5000, 'Premium VIP Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-L3', 'LARGE', 'AVAILABLE', 5000, 'Premium VIP Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-L4', 'LARGE', 'AVAILABLE', 5000, 'Premium VIP Stall', 1);

INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-M1', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-M2', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-M3', 'MEDIUM', 'RESERVED', 3000, 'Standard Plus Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-M4', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 1);

INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-S1', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-S2', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-S3', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 1);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H1-S4', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 1);

INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H2-L1', 'LARGE', 'AVAILABLE', 5000, 'Premium VIP Stall', 2);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H2-M1', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 2);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H2-M2', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 2);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H2-S1', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 2);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H2-S2', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 2);

INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H3-L1', 'LARGE', 'AVAILABLE', 5000, 'Premium VIP Stall', 3);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H3-M1', 'MEDIUM', 'AVAILABLE', 3000, 'Standard Plus Stall', 3);
INSERT IGNORE INTO stalls (stall_name, size, status, price, description, hall_id) VALUES ('H3-S1', 'SMALL', 'AVAILABLE', 1500, 'Standard Stall', 3);
