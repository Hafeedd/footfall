## System Design Summary

### Key Assumptions

- Sensors send periodic data containing `sensorId`, `timestamp`, and `count`.
- Sensor locations are static and manually configured.
- The system runs in a controlled environment with limited sensor devices.

---

### High-Level Design Decisions

- Chose the **MERN stack** to leverage JavaScript end-to-end and simplify development.
- Data is grouped and processed in the backend using JavaScript logic for simplicity and better control.
- Used react-chartjs2 with latest version for better and faster graph representation

---

### Production Scaling Strategy

- Deploy backend and frontend using **Docker and Docker Compose** on cloud platforms like AWS or DigitalOcean.
- Migrate to **MongoDB Atlas** with sharding support for better scalability.
- Optimizing the web with signal from @preact/signals-react can make the app much faster.
- Using of socket in summary and map section will make the app much responsive

---

## Project Instructions

This is a complete project which includes both the **server** and **frontend**.

- The server is created using **Express.js**
- The frontend is built with **React.js**
- To run the frontend redirect to footfall_UI and run

```bash
npm run dev
```

- To run the backend redidrect to footfall_API and run

```bash
npm start
```

---

### Sensor Simulation

There is also a `mimicSvc` file that contains a **mimic service** to call an API request every 1 hour.  
To run this file, go to the `mimicSvc` folder and run:

```bash
node index.js
```
