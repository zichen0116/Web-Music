/**
 * LRC Lyrics Parser
 * Parses .lrc format lyrics files and provides synchronized lyrics display
 */

class LRCParser {
    constructor() {
        this.lyrics = [];
        this.metadata = {};
    }

    /**
     * Parse LRC format lyrics
     * @param {string} lrcText - Raw LRC format text
     * @returns {Object} Parsed lyrics and metadata
     */
    parse(lrcText) {
        const lines = lrcText.split('\n');
        this.lyrics = [];
        this.metadata = {};

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            // Parse metadata tags [ti:title] [ar:artist] [al:album] etc.
            const metaMatch = line.match(/^\[(\w+):([^\]]+)\]/);
            if (metaMatch) {
                const [, key, value] = metaMatch;
                this.metadata[key] = value.trim();
                return;
            }

            // Parse time tags [mm:ss.xx] or [mm:ss.xxx]
            const timeMatches = [...line.matchAll(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g)];
            
            if (timeMatches.length > 0) {
                // Extract the lyric text after all time tags
                let text = line;
                timeMatches.forEach(match => {
                    text = text.replace(match[0], '');
                });
                text = text.trim();

                // Create a lyric entry for each timestamp
                timeMatches.forEach(match => {
                    const minutes = parseInt(match[1]);
                    const seconds = parseInt(match[2]);
                    const milliseconds = match[3].length === 2 
                        ? parseInt(match[3]) * 10 
                        : parseInt(match[3]);
                    
                    const time = minutes * 60 + seconds + milliseconds / 1000;
                    
                    this.lyrics.push({
                        time: time,
                        text: text
                    });
                });
            }
        });

        // Sort lyrics by time
        this.lyrics.sort((a, b) => a.time - b.time);

        return {
            lyrics: this.lyrics,
            metadata: this.metadata
        };
    }

    /**
     * Get the lyric line that should be displayed at a given time
     * @param {number} currentTime - Current playback time in seconds
     * @returns {Object|null} Current lyric object or null
     */
    getCurrentLyric(currentTime) {
        if (this.lyrics.length === 0) return null;

        // Find the lyric that should be displayed
        for (let i = this.lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= this.lyrics[i].time) {
                return {
                    index: i,
                    ...this.lyrics[i]
                };
            }
        }

        return null;
    }

    /**
     * Get the next lyric line
     * @param {number} currentTime - Current playback time in seconds
     * @returns {Object|null} Next lyric object or null
     */
    getNextLyric(currentTime) {
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time > currentTime) {
                return {
                    index: i,
                    ...this.lyrics[i]
                };
            }
        }
        return null;
    }

    /**
     * Get a range of lyrics around the current time
     * @param {number} currentTime - Current playback time in seconds
     * @param {number} before - Number of lines before current
     * @param {number} after - Number of lines after current
     * @returns {Array} Array of lyric objects
     */
    getLyricsRange(currentTime, before = 3, after = 3) {
        const current = this.getCurrentLyric(currentTime);
        if (!current) return [];

        const startIndex = Math.max(0, current.index - before);
        const endIndex = Math.min(this.lyrics.length - 1, current.index + after);

        return this.lyrics.slice(startIndex, endIndex + 1).map((lyric, i) => ({
            ...lyric,
            index: startIndex + i,
            isCurrent: (startIndex + i) === current.index
        }));
    }

    /**
     * Get all lyrics
     * @returns {Array} All lyrics
     */
    getAllLyrics() {
        return this.lyrics;
    }

    /**
     * Get metadata
     * @returns {Object} Metadata object
     */
    getMetadata() {
        return this.metadata;
    }

    /**
     * Load lyrics from a file
     * @param {string} url - URL of the LRC file
     * @returns {Promise} Promise that resolves with parsed lyrics
     */
    async loadFromFile(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            return this.parse(text);
        } catch (error) {
            console.error('Error loading LRC file:', error);
            throw error;
        }
    }
}
