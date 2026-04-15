import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters"),
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits"),
    birthDate: yup
        .string()
        .required("Date of birth is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export const contactSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 01234567890)"),
    subject: yup
        .string()
        .required("Please select a subject"),
    message: yup
        .string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
});

export const addMovieSchema = yup.object({
    type: yup.string()
        .oneOf(["normal", "featured", "coming-soon", "latest-trailer"])
        .required("Movie type is required"),

    movieName: yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Movie name is required"),

    categories: yup.array()
        .of(yup.string().oneOf(["action", "horror", "comedy", "adventure"]))
        .min(1, "Select at least one category")
        .required(),

    duration: yup.number()
        .typeError("Must be a number")
        .positive("Must be a positive number")
        .required("Duration is required"),

    seatPrices: yup.object({
        standard: yup.number()
            .typeError("Must be a number")
            .positive("Must be a positive number")
            .required("Standard price is required"),
        recliner: yup.number()
            .typeError("Must be a number")
            .positive("Must be a positive number")
            .required("Recliner price is required"),
    }).required(),

    auditorium: yup.string().required("Select an auditorium"),

    trailerUrl: yup.string()
        .url("Must be a valid URL (include https://)")
        .required("Trailer URL is required"),

    rating: yup.number()
        .typeError("Must be a number")
        .min(0, "Minimum 0")
        .max(10, "Maximum 10")
        .required("Rating is required"),

    slots: yup.array()
        .of(
            yup.object({
                date: yup.string().required("Date is required"),
                time: yup.string().required("Time is required"),
                ampm: yup.string().oneOf(["AM", "PM"]).required("Period required"),
            })
        )
        .min(1, "Add at least one movie slot")
        .required(),

    story: yup.string().trim().required("Story / synopsis is required"),
});

export type AddMovieSchemaType = yup.InferType<typeof addMovieSchema>;
