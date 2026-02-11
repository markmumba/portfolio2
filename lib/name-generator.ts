// Arrays of adjectives and nouns for generating random names
const adjectives = [
    'Curious', 'Thoughtful', 'Wise', 'Creative', 'Bold', 'Calm', 'Bright', 'Swift',
    'Gentle', 'Brave', 'Kind', 'Clever', 'Eager', 'Fierce', 'Humble', 'Joyful',
    'Lively', 'Mighty', 'Noble', 'Proud', 'Quiet', 'Radiant', 'Serene', 'Vivid',
    'Witty', 'Zealous', 'Ancient', 'Modern', 'Timeless', 'Vibrant', 'Mystic', 'Elegant'
];

const nouns = [
    'Reader', 'Thinker', 'Explorer', 'Dreamer', 'Scholar', 'Wanderer', 'Seeker', 'Observer',
    'Philosopher', 'Writer', 'Learner', 'Traveler', 'Visionary', 'Sage', 'Mentor', 'Guide',
    'Student', 'Teacher', 'Artist', 'Poet', 'Scientist', 'Engineer', 'Builder', 'Creator',
    'Innovator', 'Pioneer', 'Trailblazer', 'Adventurer', 'Discoverer', 'Researcher', 'Analyst', 'Critic'
];

/**
 * Generates a random anonymous name for reviews
 * Format: [Adjective] [Noun]
 * Example: "Curious Reader", "Bold Explorer"
 */
export function generateAnonymousName(): string {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective} ${noun}`;
}

