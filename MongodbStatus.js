async function fetchStatus() {
    try {
      const response = await fetch("http://localhost:3000/status", {
        headers: {
          "Authorization": "Basic " + btoa("admin:STRONG_PASSWORD")
        }
      });

      if (!response.ok) throw new Error("Failed to fetch status");

      const data = await response.json();
      document.getElementById("status").textContent = "Status: " + data.Status;
      document.getElementById("note").textContent = "Note: " + data.note;

    } catch (err) {
      console.error(err);
      document.getElementById("status").textContent = "Error fetching status";
    }
  }

  fetchStatus();