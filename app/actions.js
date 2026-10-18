"use server";

export async function sendMessage(previousState, formData) {
  const values = {
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    consent: formData.get("consent") === "on",
  };

  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/functions/v1/submit-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    // Success: no values returned, so React clears the form
    if (res.ok && data.success) return { success: true, message: data.message };

    // Error: send values back so the form keeps what the user typed
    return { message: data.message, errors: data.errors, values };
  } catch {
    return { message: "Could not reach the server. Check your connection and SUPABASE_URL.", values };
  }
}
