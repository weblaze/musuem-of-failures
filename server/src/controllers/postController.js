const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fetch ALL public posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { isPublic: true },
            include: {
                author: {
                    select: { username: true } // Removed email for privacy
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching posts' });
    }
};

// Fetch only authenticated user's posts (The Attic)
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { authorId: req.user.userId },
            include: {
                author: { select: { username: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching attic' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, color, isPublic } = req.body;

        const displayItem = JSON.stringify({
            type: 'painting',
            color: color || '#800020'
        });

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                displayItem,
                isPublic: isPublic !== undefined ? isPublic : true,
                author: {
                    connect: { id: req.user.userId }
                }
            }
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating post' });
    }
};

exports.togglePrivacy = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id } });

        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.authorId !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updated = await prisma.post.update({
            where: { id },
            data: { isPublic: !post.isPublic }
        });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error toggling privacy' });
    }
};
