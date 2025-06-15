import  express from 'express';
import{ registerUser, authUser,getUserProfile,getAllUsers,updateUser,deleteUser}  from '../controllers/userController.js';

import { deleteProduct, updateProduct } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile',protect,getUserProfile);
router.get('/',protect,getAllUsers);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.put('/:id', protect, isAdmin, updateUser);
router.delete('/:id', protect, isAdmin, deleteUser);

export default router;
