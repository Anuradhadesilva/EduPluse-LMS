import React from "react";
import { Audio } from "react-loader-spinner";

export const PreLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
            <div className="p-6 rounded-xl bg-black bg-opacity-20 backdrop-blur-md shadow-2xl flex flex-col items-center">
                <Audio
                    height={80}
                    width={80}
                    color="#f3f4f6"           // Light gray spinner
                    secondaryColor="#9ca3af"  // Darker gray for contrast
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                    ariaLabel="loading"
                />
                <p className="mt-4 text-white font-semibold text-lg animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
};
// import React from "react";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { motion } from "framer-motion";

// // CircularProgress with Label
// function CircularProgressWithLabel(props) {
//     return (
//         <Box sx={{ position: "relative", display: "inline-flex" }}>
//             <CircularProgress variant="determinate" {...props} />
//             <Box
//                 sx={{
//                     top: 0,
//                     left: 0,
//                     bottom: 0,
//                     right: 0,
//                     position: "absolute",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
//                     {`${Math.round(props.value)}%`}
//                 </Typography>
//             </Box>
//         </Box>
//     );
// }

// // Loader Wrapper
// export const PreLoader = () => {
//     const [progress, setProgress] = React.useState(0);

//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
//         }, 200);
//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
//             <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: [0.8, 1.2, 0.8] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//                 <CircularProgressWithLabel value={progress} size={100} thickness={1} />
//             </motion.div>
//             <motion.p
//                 className="mt-6 text-lg font-semibold text-blue-600"
//                 animate={{ opacity: [0.3, 1, 0.3] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//                 Loading...
//             </motion.p>
//         </div>
//     );
// };