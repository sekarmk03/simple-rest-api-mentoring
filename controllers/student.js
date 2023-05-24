const executeQuery = require('../db/db.conn');

module.exports = {
    index: async (req, res, next) => {
        try {
            const query = 'SELECT * FROM students';

            executeQuery(query, [], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 'INTERNAL_SERVER_ERROR',
                        message: err.message,
                        data: null
                    });
                }

                return res.status(200).json({
                    status: 'OK',
                    message: 'Get all students success',
                    data: results
                });
            });
        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const studentId = req.params.id;
            const query = 'SELECT * FROM students WHERE id = ?';

            executeQuery(query, [studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 'INTERNAL_SERVER_ERROR',
                        message: err.message,
                        data: null
                    });
                }

                if (results.length === 0) {
                    return res.status(404).json({
                        status: 'NOT_FOUND',
                        message: 'Student data not found',
                        data: null
                    });
                }

                return res.status(200).json({
                    status: 'OK',
                    message: 'Get detail student success',
                    data: results[0]
                });
            });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            let { name, nim, subject, grade } = req.body;
            grade = parseInt(grade);

            const query = 'INSERT INTO students (name, nim, subject, grade) VALUES (?, ?, ?, ?)';

            executeQuery(query, [name, nim, subject, grade], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 'INTERNAL_SERVER_ERROR',
                        message: err.message,
                        data: null
                    });
                }

                return res.status(201).json({
                    status: 'CREATED',
                    message: 'Create new student success',
                    data: results
                });
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const studentId = req.params.id;
            let { name, nim, subject, grade } = req.body;
            grade = parseInt(grade);

            const query = 'UPDATE students SET name = ?, nim = ?, subject = ?, grade = ? WHERE id = ?';

            executeQuery(query, [name, nim, subject, grade, studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 'INTERNAL_SERVER_ERROR',
                        message: err.message,
                        data: null
                    });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        status: 'NOT_FOUND',
                        message: 'Student data not found',
                        data: null
                    });
                }

                return res.status(200).json({
                    status: 'OK',
                    message: 'Update student success',
                    data: results
                });
            });
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        try {
            const studentId = req.params.id;
            const query = 'DELETE FROM students WHERE id = ?';

            executeQuery(query, [studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        status: 'INTERNAL_SERVER_ERROR',
                        message: err.message,
                        data: null
                    });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        status: 'NOT_FOUND',
                        message: 'Student data not found',
                        data: null
                    });
                }

                return res.status(200).json({
                    status: 'OK',
                    message: 'Delete student success',
                    data: results
                });
            });
        } catch (err) {
            next(err);
        }
    }
}