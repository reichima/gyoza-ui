"use client"

import { useState } from "react"
import { Button } from "@/registry/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "@/registry/ui/popover"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/registry/ui/dialog"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
} from "@/registry/ui/combobox"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry/ui/tooltip"
import { Select, SelectOption } from "@/registry/ui/select"

export default function Demo() {
  const [comboboxValue, setComboboxValue] = useState("")
  const [selectValue, setSelectValue] = useState("")

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ]

  return (
    <div className="container mx-auto py-10 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Gyoza UI Component Demo
      </h1>

      {/* Button */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">+</Button>
        </div>
      </section>

      {/* Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Card</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              This is a description of the card component.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Card content goes here. You can put any content inside this
              component.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Input & Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Input & Label</h2>
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
        </div>
      </section>

      {/* Textarea */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Textarea</h2>
        <div className="max-w-md space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here..." />
        </div>
      </section>

      {/* Select */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Select</h2>
        <div className="max-w-md space-y-2">
          <Label htmlFor="framework-select">Select Framework</Label>
          <Select
            id="framework-select"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <SelectOption value="">Select a framework...</SelectOption>
            <SelectOption value="next">Next.js</SelectOption>
            <SelectOption value="react">React</SelectOption>
            <SelectOption value="vue">Vue</SelectOption>
            <SelectOption value="svelte">Svelte</SelectOption>
          </Select>
        </div>
      </section>

      {/* Combobox */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Combobox</h2>
        <div className="max-w-md">
          <Combobox value={comboboxValue} onValueChange={setComboboxValue}>
            <ComboboxInput placeholder="Search framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxGroup heading="Frameworks">
                {frameworks.map((framework) => (
                  <ComboboxItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxContent>
          </Combobox>
        </div>
      </section>

      {/* Accordion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Accordion</h2>
        <Accordion className="max-w-md">
          <AccordionItem>
            <AccordionTrigger>What is Gyoza UI?</AccordionTrigger>
            <AccordionContent>
              Gyoza UI is a collection of beautiful, accessible, and
              customizable UI components built with Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes! All components are built with accessibility in mind and
              follow WAI-ARIA guidelines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Can I customize the styles?</AccordionTrigger>
            <AccordionContent>
              Absolutely! All components are built with Tailwind CSS and can be
              easily customized using className props.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Popover */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Popover</h2>
        <div>
          <PopoverTrigger target="demo-popover" variant="outline">
            Open Popover
          </PopoverTrigger>
          <Popover id="demo-popover">
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Tooltip */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Tooltip</h2>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Hover me (Default)</Button>
            </TooltipTrigger>
            <TooltipContent>This is a default tooltip</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="secondary">Hover me (Secondary)</Button>
            </TooltipTrigger>
            <TooltipContent variant="secondary">
              This is a secondary tooltip
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost">Hover me (Outline)</Button>
            </TooltipTrigger>
            <TooltipContent variant="outline">
              This is an outline tooltip
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Dialog</h2>
        <Dialog>
          <DialogTrigger>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@johndoe"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      {/* Combined Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Combined Form Example
        </h2>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>
              Fill out the form below to get in touch with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select id="subject">
                <SelectOption value="">Select a subject...</SelectOption>
                <SelectOption value="general">General Inquiry</SelectOption>
                <SelectOption value="support">Support</SelectOption>
                <SelectOption value="feedback">Feedback</SelectOption>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactMessage">Message</Label>
              <Textarea
                id="contactMessage"
                placeholder="How can we help you?"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
