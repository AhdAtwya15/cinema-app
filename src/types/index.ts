import type { AddMovieSchemaType } from "../validation/index";


export interface IAuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        _id: string;
        fullName?: string; //register
        username?: string; //register
        name?: string; //login
        email: string;
        role: string;
    };
}

export interface IAuthError {
    message: string;
    success: boolean;
}

export type CategoryType = "All Movies" | "action" | "horror" | "comedy" | "adventure";

export interface ICreditsMember {
    name: string;
    role: string;
    preview: string;
}

export type ICastMember = ICreditsMember;


export interface ISeatPrices {
    standard: number;
    recliner: number;
}

export interface ILatestTrailerDuration {
    hours: number;
    minutes: number;
}

export interface ILatestTrailer {
    genres: string[];
    duration: ILatestTrailerDuration;
    directors: string[];
    producers: string[];
    singers: string[];
    director: string[];
    producer: string[];
    thumbnail: string | null;
}

export interface IMovie {
    _id: string;
    type: MovieType;
    movieName: string;
    categories: MovieCategory[];
    poster: string;
    trailerUrl: string;
    videoUrl: string | null;
    rating: number;
    duration: number;
    slots: IMovieSlot[];
    seatPrices: ISeatPrices;
    auditorium: string;
    cast: ICreditsMember[];
    directors: ICreditsMember[];
    producers: ICreditsMember[];
    story: string;
    latestTrailer?: ILatestTrailer;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    thumbnail?: string;
}


export interface Person {
    name: string;
    image?: string;
    img?: string;
}


export interface Credits {
    director?: Person;
    producer?: Person;
    stars?: Person;
    singer?: Person;
}

export interface Trailer {
    id: string | number;
    title: string;
    genre: string;
    duration: string;
    year: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    credits: Credits;
}

export interface INewsItem {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    time?: string;
    date?: string;
    category: string;
    source?: string;
}

export interface IContactForm {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
}


export type SeatType = 'standard' | 'recliner';
export type SeatStatus = 'available' | 'selected' | 'booked';

export interface RowConfig {
    id: string;
    type: SeatType;
    count: number;
}

export interface ISeat {
    id: string;
    row: string;
    number: number;
    type: SeatType;
    status: SeatStatus;
}

export interface IBookingSummary {
    selectedSeats: string[];
    totalPrice: number;
}

export type MovieType = "normal" | "featured" | "coming-soon" | "latest-trailer";

export type MovieCategory = "action" | "horror" | "comedy" | "adventure";

export interface IMovieSlot {
    date: string;
    time: string;
    ampm: "AM" | "PM";
}

export type ISlot = IMovieSlot;


export interface IPhotoFile {
    file: File;
    preview: string;
}

export interface IAddMovieForm {
    type: MovieType;
    movieName: string;
    categories: MovieCategory[];
    duration: number;
    seatPrices: {
        standard: number;
        recliner: number;
    };
    slots: IMovieSlot[];
    auditorium: string;
    trailerUrl: string;
    rating: number;
    story: string;
}

export interface IAddMoviePayload extends AddMovieSchemaType {
    poster: File | null;
    castPhotos: IPhotoFile[];
    directorPhotos: IPhotoFile[];
    producerPhotos: IPhotoFile[];
}

export interface IMovieStat {
    movieId: string;
    movieName: string;
    bookings: number;
    earnings: number;
    avgPerBooking: number;
}

export interface IDashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    movieStats: IMovieStat[];
}

export interface IDashboardStatsResponse {
    success: boolean;
    stats: IDashboardStats;
}

export interface IBookingSeat {
    seatId: string;
    type: SeatType;
    price: number;
}

export interface IBookingMovie {
    id: string;
    title: string;
    poster: string;
    durationMins: number;
    category: MovieCategory;
    rating: number;
    year: number | null;
}

export interface IBooking {
    _id: string;
    userId: string;
    movieId: string;
    customer: string;
    movie: IBookingMovie;
    showtime: string;
    auditorium: string;
    seats: IBookingSeat[];
    basePrice: number;
    amount: number;
    amountPaise: number;
    currency: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBookingsResponse {
    success: boolean;
    message: string;
    total: number;
    page: number;
    limit: number;
    items: IBooking[];
}


export interface IBookingRequest {
    
  movieId: string;
  showtime: string;
  seats: IBookingSeat[];
}


export interface IBookingResponse {
    success: boolean;
    message: string;
    booking: {
        id: string;
        status: string;
        amount: number;
        amountPaise: number;
        currency: string;
    };
    checkout: {
        id: string;
        url: string;
    };
}

