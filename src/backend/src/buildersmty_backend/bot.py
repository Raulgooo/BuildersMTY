import os
import discord
from discord import app_commands
from dotenv import load_dotenv
from buildersmty_backend.services import discord as discord_service

load_dotenv()

TOKEN = os.getenv("DISCORD_BOT_TOKEN")

class BuildersBot(discord.Client):
    def __init__(self):
        intents = discord.Intents.default()
        intents.members = True # Needed for some operations
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        # Synchronize slash commands
        await self.tree.sync()

bot = BuildersBot()

@bot.tree.command(name="analyzegit", description="Vincula tu GitHub y analiza tu perfil de Builder")
async def analyzegit(interaction: discord.Interaction):
    """
    Slash command /analyzegit
    Opens a private thread and sends the OAuth link.
    """
    user = interaction.user
    
    # 1. Defer the interaction since thread creation might take a moment
    await interaction.response.defer(ephemeral=True)
    
    try:
        # 2. Create a private thread
        # Note: "private" property is for guild premium or specific types, 
        # but creating a thread and only tagging the user is common.
        # Here we create a thread in the channel where the command was run.
        thread = await interaction.channel.create_thread(
            name=f"Análisis GitHub: {user.display_name}",
            auto_archive_duration=60,
            type=discord.ChannelType.private_thread if interaction.guild.features and "COMMUNITY" in interaction.guild.features else discord.ChannelType.public_thread
        )
        
        # 3. Invitation: Add the user to the thread
        await thread.add_user(user)
        
        # 4. Generate the OAuth URL
        oauth_url = discord_service.get_oauth_url(str(user.id))
        
        # 5. Send the message in the thread
        embed = discord.Embed(
            title="🏗️ Builders MTY | Análisis de Perfil",
            description=(
                "¡Hola! Estás a un paso de analizar tu trayectoria como Builder.\n\n"
                "Al vincular tu GitHub, nuestro agente analizará:\n"
                "✅ Repositorios públicos y privados (vía OAuth)\n"
                "✅ Historial de commits y PRs\n"
                "✅ Tecnologías y stacks dominantes\n\n"
                "**Haz clic en el botón de abajo para iniciar:**"
            ),
            color=0xff5540 # Builders MTY Red
        )
        
        view = discord.ui.View()
        view.add_item(discord.ui.Button(label="Vincular GitHub", url=oauth_url, style=discord.ButtonStyle.link))
        
        await thread.send(content=f"<@{user.id}>", embed=embed, view=view)
        
        # 6. Final response to the interaction
        await interaction.followup.send(f"¡Listo! Revisa el hilo que acabo de crear para ti: {thread.mention}", ephemeral=True)
        
    except Exception as e:
        print(f"Error in /analyzegit: {e}")
        await interaction.followup.send("Hubo un error al crear tu hilo de análisis. Asegúrate de que tengo permisos para crear hilos.", ephemeral=True)

if __name__ == "__main__":
    if TOKEN:
        bot.run(TOKEN)
    else:
        print("DISCORD_BOT_TOKEN not found in environment.")
