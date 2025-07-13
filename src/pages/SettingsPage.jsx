import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { motion } from "framer-motion";
import { Settings, Palette, Shield, Sparkles } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const themes = [
    { name: "night", label: "Night Mode", description: "Dark and sleek" },
    { name: "corporate", label: "Corporate", description: "Professional look" },
    { name: "synthwave", label: "Synthwave", description: "Retro vibes" },
    { name: "cyberpunk", label: "Cyberpunk", description: "Futuristic edge" },
  ];

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Settings className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Settings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/60"
            >
              Customize your SecureChats experience
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Settings
                </h2>
                <div className="grid gap-3">
                  {themes.map((themeOption) => (
                    <motion.button
                      key={themeOption.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleThemeChange(themeOption.name)}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                        selectedTheme === themeOption.name
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="font-semibold text-white">
                        {themeOption.label}
                      </div>
                      <div className="text-sm text-white/60">
                        {themeOption.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Features
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <span className="font-semibold text-white">
                        End-to-End Encryption
                      </span>
                    </div>
                    <p className="text-sm text-white/60">
                      All messages are encrypted and secure by default
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-purple-500" />
                      <span className="font-semibold text-white">
                        Privacy First
                      </span>
                    </div>
                    <p className="text-sm text-white/60">
                      Your data stays private and secure
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
