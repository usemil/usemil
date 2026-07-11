import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact | UseMil",
  description: "Get in touch with the UseMil development team.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-32 text-center">
      <div className="mb-10 inline-flex items-center justify-center rounded-2xl bg-[#ffffff] p-4 text-blue-600">
        <Mail className="h-10 w-10" />
      </div>
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Get in <span className="text-blue-500">Touch</span>
      </h1>
      <p className="mx-auto max-w-xl text-lg text-white mb-10">
        Have a feature request, found a bug, or just want to say hi? We'd love to hear from you.
      </p>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-700 mb-6 font-medium">
          The best way to reach us is directly via email:
        </p>
        {/* Replace with your actual contact email */}
        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=hq.usemil@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-blue-500 hover:shadow-lg active:scale-95"
>
  <Mail className="h-5 w-5" />
  Email Us
</a>
        <p className="mt-8 text-sm text-slate-500">
          Or reach out via <a href="https://github.com/usemil" className="text-blue-600 hover:underline">GitHub</a> by opening an issue on our repository.
        </p>
      </div>
    </div>
  );
}