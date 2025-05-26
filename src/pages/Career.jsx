import { useState } from 'react';
import banner from '../assets/career-reduced.jpg';
import { FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Career = () => {
  const [activeForm, setActiveForm] = useState('internship');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    college_name: '',
    course: '',
    specialization: '',
    batch: '',
    job_profile: '',
    resume: null,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Update handleChange to show file name if selected
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));

    if (type === 'file' && files[0]) {
      alert(`Selected file: ${files[0].name}`);
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.mobile) errors.mobile = 'Mobile number is required in 10 digit';
    if (!formData.college_name) errors.college_name = 'College name is required';
    if (!formData.course) errors.course = 'Course name is required';
    if (!formData.specialization) errors.specialization = 'Specialization name is required';
    if (!formData.batch) errors.batch = 'Batch name is required';
    if (!formData.message) errors.message = 'Message is required';
    if (activeForm !== 'internship' && !formData.job_profile) errors.job_profile = 'Job profile is required';
    if (!formData.resume) errors.resume = 'Resume is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    const formPayload = new FormData();
    if (activeForm === 'internship') {
      for (const key in formData) {
        if (key === 'job_profile' && activeForm === 'internship') continue;
        formPayload.append(key, formData[key]);
      }
    } else {
      const formData2 = {
        name: formData['name'],
        mobile: formData['mobile'],
        email: formData['email'],
        job_profile: formData['job_profile'],
        resume: formData['resume'],
        message: formData['message'],
      };
      for (const key in formData2) {
        formPayload.append(key, formData2[key]);
      }
    }

    try {
      const endpoint = activeForm === 'internship'
        ? 'http://localhost:8080/v1/apis/apply/internship'
        : 'http://localhost:8080/v1/apis/apply/job';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) throw new Error('Failed to submit the form');

      setFormData({
        name: '',
        email: '',
        mobile: '',
        college_name: '',
        course: '',
        specialization: '',
        batch: '',
        job_profile: '',
        resume: null,
        message: '',
      });
      alert('Form submitted successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Careers - TrackAlways</title>
        <meta name="description" content="Join the TrackAlways team! Explore exciting career opportunities, our company culture, and how we empower our employees to grow and innovate in a dynamic environment." />
      </Helmet>

      <div className="relative">
        <nav className="bg-gray-800 text-white p-4">
          <h1 className="text-xl">My Website</h1>
        </nav>

        {/* Banner Image */}
        <div className="w-full h-[40vh] md:h-[50vh] lg:h-[300px]">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
            <h2 className="text-3xl mt-8 md:text-8xl">Careers</h2>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 mx-4 md:mx-8 lg:mx-20">
        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-44 mt-8 mb-6">
          <button
            className={`${activeForm === 'internship' ? 'bg-[#BEF269]' : 'bg-[#969696] text-white'
              } w-80 h-16 px-10 rounded hover:bg-[#BEF269] text-center text-xl`}
            onClick={() => setActiveForm('internship')}
          >
            Apply for Internship
          </button>
          <button
            className={`${activeForm === 'job' ? 'bg-[#BEF269]' : 'bg-[#969696] text-white'
              } w-80 h-16 px-10 rounded hover:bg-[#BEF269] text-center text-xl`}
            onClick={() => setActiveForm('job')}
          >
            Apply for Job
          </button>
        </div>

        {/* Form for Internship */}
        {activeForm === 'internship' && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Full name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Email address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter email address"
                />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Contact No*</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter contact number"

                />
                {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">College Name*</label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter college name"

                />
                {formErrors.college_name && <p style={{ color: 'red' }}>{formErrors.college_name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Course*</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter course"

                />
                {formErrors.course && <p style={{ color: 'red' }}>{formErrors.course}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Specialization*</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter specialization"

                />
                {formErrors.specialization && <p style={{ color: 'red' }}>{formErrors.specialization}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Year of internship*</label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter year of internship"

                />
                {formErrors.batch && <p style={{ color: 'red' }}>{formErrors.batch}</p>}
              </div>

              {/* Upload Resume */}
              <div className="flex flex-col justify-end">
                <label className="text-lg font-semibold mb-1 text-gray-600">Upload Resume*</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  className="hidden"
                  id="uploadResume"

                />
                <label
                  htmlFor="uploadResume"
                  className="bg-black text-white py-4 px-6 rounded cursor-pointer w-40 hover:bg-opacity-90 flex items-center justify-center"
                >
                  Browse...
                </label>
                {formErrors.resume && <p style={{ color: 'red' }}>{formErrors.resume}</p>}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1 text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded w-full h-32 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your message here..."
              ></textarea>
              {formErrors.message && <p style={{ color: 'red' }}>{formErrors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center" style={{ marginTop: '90px', marginBottom: '60px' }}>
              <button
                type="submit"
                className="bg-white text-[#439600] border border-[#439600] font-semibold px-16 py-3 rounded-tr-3xl rounded-bl-3xl shadow-md hover:bg-[#439600] hover:text-white transition duration-300 ease-in-out flex items-center"
              >
                {loading ? 'Submitting...' : 'Submit'}
                <FaArrowRight className="ml-2" /> {/* Adds space between text and icon */}
              </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}

        {/* Form for Job */}
        {activeForm === 'job' && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Full name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter full name"

                />
                {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Email address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter email address"

                />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Contact No*</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter contact number"

                />
                {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1 text-gray-600">Job Profile*</label>
                <input
                  type="text"
                  name="job_profile"
                  value={formData.job_profile}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded w-full h-12 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter job profile"

                />
                {formErrors.job_profile && <p style={{ color: 'red' }}>{formErrors.job_profile}</p>}
              </div>

              {/* Upload Resume for Job */}
              <div className="flex flex-col justify-end">
                <label className="text-lg font-semibold mb-1 text-gray-600">Upload Resume*</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  className="hidden"
                  id="uploadResume"

                />
                <label
                  htmlFor="uploadResume"
                  className="bg-black text-white py-4 px-6 rounded cursor-pointer w-40 hover:bg-opacity-90 flex items-center justify-center"
                >
                  Browse...
                </label>
                {formErrors.resume && <p style={{ color: 'red' }}>{formErrors.resume}</p>}
                {formData.resume && (
                  <p className="text-gray-600 mt-2">{formData.resume.name}</p>
                )}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-1 text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded w-full h-32 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your message here..."
              ></textarea>
              {formErrors.message && <p style={{ color: 'red' }}>{formErrors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center" style={{ marginTop: '90px', marginBottom: '60px' }}>
              <button
                type="submit"
                className="bg-white text-[#439600] border border-[#439600] font-semibold px-16 py-3 rounded-tr-3xl rounded-bl-3xl shadow-md hover:bg-[#439600] hover:text-white transition duration-300 ease-in-out flex items-center"
              >
                {loading ? 'Submitting...' : 'Submit'}
                <FaArrowRight className="ml-2" /> {/* Adds space between text and icon */}
              </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}
      </div>
    </>
  );
};

export default Career;
