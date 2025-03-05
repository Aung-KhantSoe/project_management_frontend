import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import React, { useState } from 'react'
import { ProjectCard } from '../Project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/Redux/Store'
import { fetchProjects, searchProjects } from '@/Redux/Project/Action'

export const tags = [
    'all', 'react', 'nextjs', 'spring boot', 'mysql', 'mongodb', 'angular', 'python', 'flask', 'django'
]

export const ProjectList = () => {
    const [keyword, setKeyword] = useState("");
    const { project } = useSelector(store => store);
    const dispatch = useDispatch();
    const handleFilterCategory = (section, value) => {
        if (value == 'all') {
            dispatch(fetchProjects({}))
        } else {
            dispatch(fetchProjects({ category: value }))
        }
    }
    const handleFilterTag = (section, value) => {
        if (value == 'all') {
            dispatch(fetchProjects({}))
        } else {
            dispatch(fetchProjects({ tag: value }))
        }
    }
    const handleSearchChange = (e) => {
        dispatch(searchProjects(e.target.value));
        setKeyword(e.target.value);
    }

    // useEffect(()=>{
    //     dispatch(fetchProjects({}))
    // },[])
    // console.log('project store',project)
    return (
        <>
            <div className='relative px-10 lg:px-0 lg:flex gap-5 justify-center py-5'>
                <section className='filterSection'>
                    <Card className="p-5 sticky top-10">
                        <div className='flex justify-between lg:w-[20rem]'>
                            <p className='text-xl -tracking-wider'>Filters </p>
                            <Button variant="ghost" size="icon">
                                <MixerHorizontalIcon></MixerHorizontalIcon>
                            </Button>
                        </div>
                        <CardContent className="mt-5">
                            <ScrollArea className='space-y-7 h-[70vh] overflow-auto'>
                                <div>
                                    <h1 className='pb-3 text-gray-400 border-b'>
                                        Category
                                    </h1>
                                    <div className='pt-5'>
                                        <RadioGroup className="space-y-3 pt-5" defaultValue='all' onValueChange={(value) => handleFilterCategory("category", value)}>
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value='all' id='r1'></RadioGroupItem>
                                                <Label htmlFor='r1'>All</Label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value='fullstack' id='r2'></RadioGroupItem>
                                                <Label htmlFor='r2'>FullStack</Label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value='frontend' id='r3'></RadioGroupItem>
                                                <Label htmlFor='r3'>Frontend</Label>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <RadioGroupItem value='backend' id='r4'></RadioGroupItem>
                                                <Label htmlFor='r4'>Backend</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className='pt-9'>
                                    <h1 className='pb-3 text-gray-400 border-b'>
                                        Tag
                                    </h1>
                                    <div className='pt-5'>
                                        <RadioGroup className="space-y-3 pt-5" defaultValue='all' onValueChange={(value) => handleFilterTag("tag", value)}>
                                            {tags.map((item) => <div key={item} className='flex items-center gap-2'>
                                                <RadioGroupItem value={item} id={`rl-${item}`}></RadioGroupItem>
                                                <Label htmlFor={`rl-${item}`}>{item}</Label>
                                            </div>)}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>
                <section className='projectListSection w-full lg:w-[48rem]'>
                    <div className='flex gap-2 items-center pb-5 justify-between'>
                        <div className='relative p-0 w-full'>
                            <Input
                                onChange={handleSearchChange}
                                placeholder="search project"
                                className="40% px-9"></Input>
                            <MagnifyingGlassIcon className='absolute top-3 left-4'></MagnifyingGlassIcon>
                        </div>
                    </div>
                    <div>
                        <div className='space-y-5 min-h-[74vh]' >
                            {/* {
                                keyword ? project.searchProjects?.map((item,index) => <ProjectCard key={item.id*index} item={item}/>) :
                                    project.projects?.map((item) => <ProjectCard key={item} item={item}/>)
                            } */}
                            {
                                keyword
                                    ? project.searchProjects?.map((item, index) => (
                                        <ProjectCard key={item.id} item={item} />
                                    ))
                                    : project.projects?.map((item) => (
                                        <ProjectCard key={item.id} item={item} />
                                    ))
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
