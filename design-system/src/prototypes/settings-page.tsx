import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="settings-name">Name</FieldLabel>
              <Input id="settings-name" defaultValue="Alena Vyhouskaya" />
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-bio">Bio</FieldLabel>
              <Textarea
                id="settings-bio"
                placeholder="Tell us a little bit about yourself"
              />
              <FieldDescription>
                You can @mention other users to link to them.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-language">Language</FieldLabel>
              <Select defaultValue="en">
                <SelectTrigger id="settings-language" className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-email">Email notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive product updates by email.
              </p>
            </div>
            <Switch id="notify-email" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-push">Push notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified on your devices.
              </p>
            </div>
            <Switch id="notify-push" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { SettingsPage }
