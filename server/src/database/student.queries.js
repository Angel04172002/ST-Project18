const getStudentsWithParents = `   
    select 
    s.id as student_id, ps.first_name as student_first_name, ps.last_name as student_last_name, ps.email as student_email,
    pp.id as parent_id, pp.first_name as parent_first_name, pp.last_name as parent_last_name, pp.email as parent_email
    from student s
    inner join profile ps
    on s.id = ps.id
    inner join parent par
    on s.parent_id = par.id
    inner join profile pp
    on par.id = pp.id 
`;



const getParentById = ` 
select par.id, p.first_name, p.last_name, p.email from parent par 
inner join profile p
on par.id = p.id
where par.id = $1
`;


module.exports = {
    getStudentsWithParents,
    getParentById
};








