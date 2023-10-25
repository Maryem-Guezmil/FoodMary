import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderItemSchema, OrderModel } from "../models/order.model";
import { orderStatusEnum } from "../constants/orderStatusEnum";
import auth from "../middelewares/auth.mid";

const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
    console.log(requestOrder)

    if(requestOrder.items.length <= 0){
      console.log("houni")
        res.status(400).send('Cart Is Empty!');
        return;
        
    }
  //instead of updating it everytime
    //ken el token value fl misslware is verifed nweliw nsobou el reslt fl user
    await OrderModel.deleteOne({
        user: req.user.id,
        status: orderStatusEnum.NEW
    });
    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    
    console.log(newOrder)
    await newOrder.save();
    res.send(newOrder);

})
)

router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req: any, res) => {
    const order = await OrderModel.findOne({
      user: req.user.id,
      status: orderStatusEnum.NEW,
    });

    if (order) res.send(order);
    else res.status(400).send();
    

  })
);

router.post('/pay',asyncHandler(async(req:any,res)=>{
  const {paymentId}=req.body;
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: orderStatusEnum.NEW,
  });
  if (!order){
     res.status(400).send('order not found');
     return;
  }
  order.paymentId=paymentId
  order.status=orderStatusEnum.PAYED 
  await order.save()

  //send it to client bc we gonna need it to navigate to page of order tracking
  res.send(order._id)


}))

router.get("/track/:id",asyncHandler(async(req,res)=>{
  const order= await OrderModel.findById(req.params.id)
  res.send(order)
}))

export default router;
