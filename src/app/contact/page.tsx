"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import SiteFooter from "../SiteFooter";
import { FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, category, message }),
        });
        if (res.ok) {
          setIsSubmitted(true);
          setName("");
          setEmail("");
          setCategory("general");
          setMessage("");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", position: "relative", overflowX: "hidden" }}>
      
      {/* Background ambient grids/glows */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(224, 123, 57, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224, 123, 57, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 1
        }}
      ></div>

      <Navbar />

      {/* Hero Header */}
      <section style={{ padding: "100px 0 40px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#E07B39", letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px" }}>
            {"// REACH OUT"}
          </div>
          
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 6vw, 64px)",
              lineHeight: 0.95,
              color: "#26231F",
              letterSpacing: "-.03em",
              margin: "0 0 20px"
            }}
          >
            We&apos;d Love to Hear From You.
          </h1>
          
          <p
            className="font-hanken"
            style={{
              fontSize: "18px",
              lineHeight: 1.5,
              color: "#6B6560",
              maxWidth: "580px",
              margin: "0 auto"
            }}
          >
            Have a question about our pricing, features, or looking for a custom integration? Drop us a message below.
          </p>

        </div>
      </section>

      {/* Contact Card & Form Section */}
      <section style={{ padding: "40px 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px" }}>
          
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #ECE8E2",
              borderRadius: "28px",
              padding: "48px 40px",
              boxShadow: "0 4px 30px rgba(0,0,0,0.01)",
              position: "relative"
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: "#2C9A5E", marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                  <FiCheckCircle size={56} />
                </div>
                <h3 className="font-bricolage" style={{ fontSize: "24px", fontWeight: 800, color: "#26231F", marginBottom: "12px" }}>
                  Message Sent Successfully!
                </h3>
                <p className="font-hanken" style={{ fontSize: "15px", color: "#6B6560", lineHeight: 1.6, maxWidth: "380px", margin: "0 auto 28px" }}>
                  Thank you for reaching out. A member of our team will get back to you at the email address provided shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "999px",
                    border: "1.5px solid #E07B39",
                    background: "transparent",
                    color: "#E07B39",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  className="hover-bg-orange"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label className="font-bricolage" style={{ fontSize: "14.5px", fontWeight: 700, color: "#26231F" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #F0D5C1",
                      background: "#fff",
                      outline: "none",
                      fontSize: "14.5px",
                      color: "#26231F",
                      fontFamily: "var(--font-hanken)",
                      transition: "border-color 0.2s"
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label className="font-bricolage" style={{ fontSize: "14.5px", fontWeight: 700, color: "#26231F" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #F0D5C1",
                      background: "#fff",
                      outline: "none",
                      fontSize: "14.5px",
                      color: "#26231F",
                      fontFamily: "var(--font-hanken)",
                      transition: "border-color 0.2s"
                    }}
                  />
                </div>

                {/* Topic / Category */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label className="font-bricolage" style={{ fontSize: "14.5px", fontWeight: 700, color: "#26231F" }}>
                    Topic
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #F0D5C1",
                      background: "#fff",
                      outline: "none",
                      fontSize: "14.5px",
                      color: "#26231F",
                      fontFamily: "var(--font-hanken)",
                      transition: "border-color 0.2s",
                      cursor: "pointer"
                    }}
                  >
                    <option value="general">General Enquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Business / Partnership</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label className="font-bricolage" style={{ fontSize: "14.5px", fontWeight: 700, color: "#26231F" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe how we can help you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: "1.5px solid #F0D5C1",
                      background: "#fff",
                      outline: "none",
                      fontSize: "14.5px",
                      color: "#26231F",
                      fontFamily: "var(--font-hanken)",
                      resize: "none",
                      transition: "border-color 0.2s"
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#E07B39",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 20px -8px rgba(224,123,57,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 0.2s"
                  }}
                  className="hover-bg-darkorange"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
