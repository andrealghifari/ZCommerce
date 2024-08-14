import { MarkEmailReadOutlined } from "@mui/icons-material";
import { Box, InputBase, Typography, IconButton, Divider} from "@mui/material";
import { useState } from "react";

const Subscription = () => {
    const [email, setEmail] = useState("")
    return (
        <Box sx={{width : "80%", m : "80px auto", textAlign: "center"}}>
            <IconButton>
                <MarkEmailReadOutlined/>
            </IconButton>
            <Typography variant="h3">Subscribe To Our Newsletter</Typography>
            <Typography sx={{m : "8px auto"}}>And receive 15$ coupon on your first order checkout</Typography>
            <Box sx={{
                p : "2px 4px",
                m : "15px auto",
                display : "flex",
                alignItems : "center",
                backgroundColor : "#F2F2F2",
                width: "75%",
            }}>
                <InputBase
                sx={{ml: 1, flex : 1}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email here"
                />
                <Divider sx={{height: 28, m: .5}} orientation="vertical"/>
                <Typography sx={{p: "10px", "&:hover" : {cursor : "pointer"}, fontWeight : 600}}>Subscribe</Typography>
            </Box>
        </Box>


    )
}

export default Subscription;

