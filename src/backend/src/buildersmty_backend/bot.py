import os
import asyncio
import discord
from discord import app_commands
from dotenv import load_dotenv
from buildersmty_backend.services import discord as discord_service

load_dotenv()

TOKEN = os.getenv("DISCORD_BOT_TOKEN")


class BuildersBot(discord.Client):
    def __init__(self):
        intents = discord.Intents.default()
        intents.members = True
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()


bot = BuildersBot()


async def _delete_thread_later(thread: discord.Thread, delay: int = 120):
    """Delete a thread after a delay (in seconds). Fails silently if already gone."""
    await asyncio.sleep(delay)
    try:
        await thread.delete()
    except (discord.NotFound, discord.Forbidden):
        pass
    except Exception as e:
        print(f"Error deleting thread: {e}")


@bot.tree.command(name="analyzegit", description="Vincula tu GitHub y analiza tu perfil de Builder")
async def analyzegit(interaction: discord.Interaction):
    """
    Slash command /analyzegit
    Opens a private thread and sends the OAuth link.
    Thread auto-deletes after 2 minutes.
    """
    user = interaction.user

    await interaction.response.defer(ephemeral=True)

    try:
        thread = await interaction.channel.create_thread(
            name=f"Análisis GitHub: {user.display_name}",
            auto_archive_duration=60,
            type=discord.ChannelType.private_thread if interaction.guild.features and "COMMUNITY" in interaction.guild.features else discord.ChannelType.public_thread
        )

        await thread.add_user(user)

        oauth_url = discord_service.get_oauth_url(str(user.id))

        embed = discord.Embed(
            title="Builders MTY | Análisis de Perfil",
            description=(
                "Estás a un paso de analizar tu trayectoria como Builder.\n\n"
                "Al vincular tu GitHub, nuestro agente analizará:\n"
                "- Repositorios públicos y privados\n"
                "- Commits y PRs del año actual\n"
                "- Contribuciones a proyectos externos\n"
                "- Tecnologías y stacks dominantes\n\n"
                "**Haz clic en el botón de abajo para iniciar.**\n\n"
                "*Este hilo se eliminará en 2 minutos.*"
            ),
            color=0xff5540
        )

        view = discord.ui.View()
        view.add_item(discord.ui.Button(label="Vincular GitHub", url=oauth_url, style=discord.ButtonStyle.link))

        await thread.send(content=f"<@{user.id}>", embed=embed, view=view)

        # Schedule thread deletion after 2 minutes
        bot.loop.create_task(_delete_thread_later(thread, delay=120))

        await interaction.followup.send(f"Revisa el hilo: {thread.mention} (se eliminará en 2 min)", ephemeral=True)

    except Exception as e:
        print(f"Error in /analyzegit: {e}")
        await interaction.followup.send("Hubo un error al crear tu hilo de análisis. Asegúrate de que tengo permisos para crear hilos.", ephemeral=True)


if __name__ == "__main__":
    if TOKEN:
        bot.run(TOKEN)
    else:
        print("DISCORD_BOT_TOKEN not found in environment.")
