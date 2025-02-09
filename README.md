# Christful

**Christful** is a faith-based social media platform designed to help users share their opinions, experiences, and content in a safe and uplifting environment.

## Features

- **User Authentication**: Secure login and registration system.
- **Post Creation**: Share text, images, videos, and audio.
- **NSFW Content Detection**: AI-powered filtering of inappropriate content.
- **Image & Video Uploads**: Users can upload and share media files.
- **Interactive UI**: A smooth and intuitive interface using React Native.

## Technologies Used

- **Frontend**: React Native (Expo)
- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL, Cloudinary
- **APIs & Services**:
  - **Sightengine API** (NSFW content detection)
  - **Axios** (API requests)
  - **Expo Image Picker** (Media uploads)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- Expo CLI
- PostgreSQL (for database)
- Required dependencies (`npm install` or `yarn install`)

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/christful/christful.git
   ```
2. Navigate to the project folder:
   ```sh
   cd christful
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   expo start
   ```

## NSFW Content Detection Integration

Christful utilizes **Sightengine API** to filter NSFW content. Below is an example of how media content is analyzed:

```javascript
const checkImageForNSFW = async (base64Image) => {
  try {
    const imageResponse = await axios.post(
      "https://api.sightengine.com/1.0/check.json",
      {
        media: `data:image/jpeg;base64,${base64Image}`,
        models: "nudity-2.1",
        api_user: "YOUR_API_USER",
        api_secret: "YOUR_API_SECRET",
      }
    );

    const { nudity } = imageResponse.data;
    if (nudity.safe < 0.5) {
      Alert.alert("Warning", "Your image contains NSFW content.");
    } else {
      Alert.alert("Success", "Image is safe.");
    }
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    Alert.alert("Error", "Failed to check image content.");
  }
};
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request

## Contact

For support or inquiries, reach out via:

- **Email**: christful7@gmail.com
- **Website**: In process

## License

This project is licensed under the MIT License. See `LICENSE` for details.
