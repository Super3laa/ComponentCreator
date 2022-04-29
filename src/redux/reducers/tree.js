import Node from "../../components/Node/Node";
const tree=(state={MotherNode:new Node({ name: 'MotherNode' }),ref:true},action)=>{
    switch (action.type){
        case 'updateMotherNode':
            return {...state,MotherNode:action.payload}
        case 'refreshTree':
            return{MotherNode:state.MotherNode,ref : !state.ref};
        default:
            return state;
    }
}
export default tree;
