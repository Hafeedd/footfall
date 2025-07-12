const DEVICES = ["SENSOR1", "SENSOR2"];

const randomFootfallAPICaller = async () => {
  console.log("Calling footfall API...");
  const randomDevice = DEVICES[Math.floor(Math.random() * DEVICES.length)];

  const submitData = {
    sensorId: randomDevice,
    count: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  };
  try {
    const response = await fetch("http://localhost:8080/sensor-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });

    if (response.status === 200) {
      console.log(
        "Data submitted successfully, The next call will be in 1 hour."
      );
    } else {
      console.log("Something went wrong :\n", response);
    }
  } catch (error) {
    console.error("Error calling footfall API:", error);
  }
};

// I just called the function for initial request.
randomFootfallAPICaller();

setInterval(randomFootfallAPICaller, 5000); // here 3600000 is 1 hour in milliseconds, change if needed.
