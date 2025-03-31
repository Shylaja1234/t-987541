
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const LocationMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl overflow-hidden shadow-lg"
    >
      <div className="aspect-[16/7] relative">
        <iframe
          title="ConnectingBee Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9852035082897!2d77.59791931482149!3d12.971598690855118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1654672024098!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <div className="absolute bottom-6 left-6 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
          <div className="flex items-start">
            <div className="mr-3 p-2 rounded-full bg-accent/10 text-accent flex-shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">ConnectingBee Headquarters</h3>
              <p className="text-muted-foreground text-sm">
                42 Cyber Plaza, Tech Park<br />
                Bangalore, Karnataka 560103<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationMap;
