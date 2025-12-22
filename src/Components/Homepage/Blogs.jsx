import React from "react";

const blogsData = [
  {
    id: 1,
    title: "Importance of Blood Donation",
    description:
      "Blood donation saves lives! Learn why it is crucial to donate regularly and how it helps patients in need.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
    link: "#",
  },
  {
    id: 2,
    title: "Who Can Donate Blood?",
    description:
      "Not everyone can donate blood. Learn the eligibility criteria and guidelines for safe blood donation.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
    link: "#",
  },
  {
    id: 3,
    title: "Benefits of Donating Blood",
    description:
      "Donating blood is not only life-saving but also has health benefits for donors. Find out more here.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
    link: "#",
  },
  {
    id: 4,
    title: "Blood Donation Myths Debunked",
    description:
      "There are many myths around blood donation. Let's separate fact from fiction and encourage more donors.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
    link: "#",
  },
];

const Blogs = () => {
  return (
    <section className="py-16 bg-red-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-12">
          Latest Blogs & Articles 🩸
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <a
                  href={blog.link}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
