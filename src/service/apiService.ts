export default class apiService {
  API_URL: string = "http://localhost:9000";
  async fetchData(endPoint: string) {
    const res = await fetch(`${this.API_URL}/${endPoint}`);
    const response = await res.json();
    return response;
  }

  async addData(endPoint: string, body: any) {
    const res = await fetch(`${this.API_URL}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  }

  async updateData(endPoint: string, id: number, body: any) {
    const res = await fetch(`${this.API_URL}/${endPoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  }

  async deleteData(endPoint: string, id: number) {
    const res = await fetch(`${this.API_URL}/${endPoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    return response;
  }
}
