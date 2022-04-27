export const updateMotherNode=(node)=>{
    return {
        type:'updateMotherNode',
        payload:node
    };
}
export const refreshTree=()=>{
    return {
        type:'refreshTree',
    };
}
